package entity

import ("gorm.io/gorm"  
		"time" )

type Review struct {
	gorm.Model
	Rating uint
	Comment string
	ReviewDate time.Time


	// UserId ทำหน้าที่เป็น FK
	UserID *uint
	User   User  `gorm:"foreignKey:UserID"`

	// UserId ทำหน้าที่เป็น FK
	CourseID *uint
	Course   Course  `gorm:"foreignKey:CourseID"`
}