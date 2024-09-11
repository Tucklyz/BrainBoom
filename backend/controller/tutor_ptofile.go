
package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Tucklyz/BrainBoom/config"
	"github.com/Tucklyz/BrainBoom/entity"
	
)

// POST /tutor-profile
func CreateTutorProfile(c *gin.Context) {
	var tutorProfile entity.TutorProfile

	// bind ข้อมูลที่รับมาเป็น JSON เข้าตัวแปร tutorProfile
	if err := c.ShouldBindJSON(&tutorProfile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลหรือไม่
	var user entity.User
	if err := db.First(&user, tutorProfile.UserID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	// บันทึกข้อมูลโปรไฟล์ผู้สอน
	if err := db.Create(&tutorProfile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Tutor profile created", "data": tutorProfile})
}

// GET /tutor-profile/:id
func GetTutorProfile(c *gin.Context) {
	ID := c.Param("id")
	var tutorProfile entity.TutorProfile

	db := config.DB()
	results := db.Preload("User").First(&tutorProfile, ID) // Preload User
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, tutorProfile)
}

// GET /tutor-profiles
func ListTutorProfiles(c *gin.Context) {
	var tutorProfiles []entity.TutorProfile

	db := config.DB()
	results := db.Preload("User").Find(&tutorProfiles) // Preload User
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, tutorProfiles)
}

// PATCH /tutor-profile/:id
func UpdateTutorProfile(c *gin.Context) {
	var tutorProfile entity.TutorProfile

	TutorProfileID := c.Param("id")

	db := config.DB()
	result := db.First(&tutorProfile, TutorProfileID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tutor profile not found"})
		return
	}

	if err := c.ShouldBindJSON(&tutorProfile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// ตรวจสอบว่าผู้ใช้ที่เชื่อมโยงมีอยู่หรือไม่
	var user entity.User
	if err := db.First(&user, tutorProfile.UserID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	result = db.Save(&tutorProfile)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully", "data": tutorProfile})
}

// DELETE /tutor-profile/:id
func DeleteTutorProfile(c *gin.Context) {
	ID := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM tutor_profiles WHERE id = ?", ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tutor profile id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}
