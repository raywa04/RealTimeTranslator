# Use the official Golang image to create a build artifact.
FROM golang:1.17 AS build

# Create and change to the app directory.
WORKDIR /app

# Copy go mod and sum files
COPY go.mod ./
COPY go.sum ./

# Download dependencies.
RUN go mod download

# Copy the source code.
COPY . ./

# Build the Go app
RUN go build -o main .

# Use the official Golang image to run the app.
FROM golang:1.17

# Create and change to the app directory.
WORKDIR /app

# Copy the binary from the build stage.
COPY --from=build /app/main /app/main

# Run the binary.
CMD ["/app/main"]
