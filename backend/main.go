package main

import (
	"net/http"

	"github.com/Tucklyz/BrainBoom/config"
	"github.com/Tucklyz/BrainBoom/controller"
	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {
    // Open connection database
    config.ConnectionDB()
    
    // Generate databases
    config.SetupDatabase()
    
    r := gin.Default()
    
    r.Use(CORSMiddleware())
    
    router := r.Group("")
    {
        // User Routes
        router.GET("/users", controller.ListUsers)
        router.GET("/user/:id", controller.GetUser)
        router.POST("/users", controller.CreateUser)
        router.PATCH("/users", controller.UpdateUser)
        router.DELETE("/users/:id", controller.DeleteUser)
        
        // Course Routes
        router.GET("/courses", controller.ListCourse)
        router.GET("/courses/:id", controller.GetCourse)
        router.GET("/courses/category/:id", controller.GetCourseByCategoryID)
        router.GET("/tutor/:id", controller.GetCourseByCategoryID)
        router.POST("/courses", controller.CreateCourse)
        router.PUT("/courses/:id", controller.UpdateCourse)
        router.DELETE("/courses/:id", controller.DeleteCourse)

    }
    
    r.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "API RUNNING... PORT: 8000"})
    })
    
    // Run the server
    r.Run("localhost:" + PORT)
}


func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
