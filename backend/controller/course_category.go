package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Tucklyz/BrainBoom/config"
	"github.com/Tucklyz/BrainBoom/entity"
	
)

// GET /Course
func ListCourse_Category(c *gin.Context) {
	var course_category []entity.CourseCategory

	db := config.DB()

	db.Find(&course_category)

	c.JSON(http.StatusOK, &course_category)
}