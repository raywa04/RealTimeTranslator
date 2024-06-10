package main

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "bytes"
    "github.com/gorilla/websocket"
    "github.com/gin-gonic/gin"
    "google.golang.org/api/option"
    firebase "firebase.google.com/go/v4"
)

var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}

func translateText(text string) (string, error) {
    requestBody, err := json.Marshal(map[string]string{
        "text": text,
    })
    if err != nil {
        return "", err
    }

    resp, err := http.Post("http://localhost:5000/translate", "application/json", bytes.NewBuffer(requestBody))
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()

    var result map[string]string
    err = json.NewDecoder(resp.Body).Decode(&result)
    if err != nil {
        return "", err
    }

    return result["translation"], nil
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Fatal(err)
    }
    defer ws.Close()

    for {
        var msg map[string]string
        err := ws.ReadJSON(&msg)
        if err != nil {
            log.Printf("error: %v", err)
            break
        }

        translation, err := translateText(msg["text"])
        if err != nil {
            log.Printf("error: %v", err)
            break
        }

        response := map[string]string{
            "translation": translation,
        }
        err = ws.WriteJSON(response)
        if err != nil {
            log.Printf("error: %v", err)
            break
        }
    }
}

func main() {
    // Initialize Firebase
    ctx := context.Background()
    conf := &firebase.Config{ProjectID: "your-project-id"}
    app, err := firebase.NewApp(ctx, conf, option.WithCredentialsFile("path/to/serviceAccountKey.json"))
    if err != nil {
        log.Fatalf("error initializing app: %v", err)
    }

    r := gin.Default()

    r.GET("/ws", func(c *gin.Context) {
        handleConnections(c.Writer, c.Request)
    })

    r.Run(":8080")
}
