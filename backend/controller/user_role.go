package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Tucklyz/BrainBoom/config"
	"github.com/Tucklyz/BrainBoom/entity"
	
)

// GET /UserRole
func ListUserRoles(c *gin.Context) {
	var user_role []entity.UserRole

	db := config.DB()

	db.Find(&user_role)

	c.JSON(http.StatusOK, &user_role)
}