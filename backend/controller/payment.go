package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Tucklyz/BrainBoom/config"
	"github.com/Tucklyz/BrainBoom/entity"
	
)

// GET /Payment
func ListPayment (c *gin.Context) {
	var payment []entity.Payment

	db := config.DB()

	db.Find(&payment)

	c.JSON(http.StatusOK, &payment)
}