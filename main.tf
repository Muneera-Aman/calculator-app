terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "calculator" {
  name = "calculator-app"

  build {
    context = "."
  }
}

resource "docker_container" "app" {
  name  = "calculator-container"
  image = docker_image.calculator.name

  ports {
    internal = 80
    external = 8090
  }
}