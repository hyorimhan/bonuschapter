# 📚 별책부록 (Byeolchaekboorok)
> 당신만의 아늑한 독서 일기장 📖🧸


<p align="center">
  <img src="https://github.com/user-attachments/assets/ea508c33-7e1d-45bc-8dc5-2a0d82c96f8f" width="300" alt="곰돌이 로고">
</p>

## 🐻 프로젝트 소개

**별책부록**은 여러분의 소중한 독서 기록을 관리해주는 따뜻한 독서 다이어리 서비스입니다. 책을 읽고 난 후의 감상과 생각을 기록하고, 나만의 작은 서재를 디지털 공간에 마련해보세요.
> "책은 마음의 양식, 별책부록은 그 양식을 담는 아늑한 그릇" 🍯

## ✨ 주요 기능

### 📖 나만의 도서관 관리
✅ **책 검색 및 등록**: 카카오 책 검색 API를 통해 원하는 책을 찾아 나만의 서재에 추가하세요!  
✅ **독서 기록**: 읽은 날짜와 함께 소중한 감상을 기록할 수 있어요.  
✅ **책장 정리**: 등록한 도서를 무한 스크롤로 둘러보고, 수정하거나 삭제할 수 있어요.  

### 📝 독서 메모장
✅ 책에 대한 생각, 감정, 인상 깊은 구절을 남겨보세요.  
✅ 나중에 다시 읽어볼 수 있도록 소중한 메모를 보관해요.  

### 📊 인기 도서 추천
✅ 도서관 정보나루 API를 통해 현재 인기 있는 도서 정보를 확인하세요!  
✅ 새로운 독서 영감을 얻을 수 있어요!  

### 🔐 안전한 계정 관리
✅ **JWT 인증 방식**으로 안전하게 로그인하세요.  
✅ 나만의 독서 기록은 나만 볼 수 있어요.  

---

## 🛠️ 기술 스택

### **📌 백엔드**
![Express.js](https://img.shields.io/badge/Express.js-4.21.2-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6.37.5-52B0E7?logo=sequelize&logoColor=white)
![Bcrypt.js](https://img.shields.io/badge/Bcrypt.js-2.4.3-00BFFF)

### **🎨 프론트엔드**
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.1.5-CA4245?logo=reactrouter&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-5.66.0-FF4154?logo=reactquery&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.54.2-EC5990?logo=reacthookform&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.6-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.3-000000?logo=zustand&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-11.2.4-6332F6?logo=swiper&logoColor=white)

---

## 📊 DB 스키마

### **🛠 Users 테이블**
| 필드 | 타입 | 설명 |
|------|------|------|
| id | TEXT | 기본 키 (UUID) |
| username | TEXT | 사용자 이름 (고유) |
| password | TEXT | 해시된 비밀번호 |
| created_at | TIMESTAMP | 계정 생성일 |

### **📖 Books 테이블**
| 필드 | 타입 | 설명 |
|------|------|------|
| id | TEXT | 기본 키 (UUID) |
| user_id | TEXT | 소유자 ID (users.id 참조) |
| title | TEXT | 책 제목 |
| authors | TEXT | 저자 |
| thumbnail | TEXT | 책 표지 이미지 URL |
| isbn | TEXT | ISBN 코드 (고유) |
| read_date | DATE | 읽은 날짜 |
| memo | TEXT | 책에 대한 메모 |
| created_at | TIMESTAMP | 도서 등록일 |

---

## 🌐 API 명세

### **👤 사용자 관리**
| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|------|------|------|
| 회원가입 | POST | /api/auth/signup | 새 사용자 등록 |
| 로그인 | POST | /api/auth/login | JWT 인증 로그인 |
| 로그아웃 | POST | /api/auth/logout | 쿠키 삭제 후 로그아웃 |
| 사용자 정보 조회 | GET | /api/auth/me | 현재 로그인된 사용자 정보 조회 |

### **📚 도서 관리**
| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|------|------|------|
| 책 검색 | GET | /api/books/search | 카카오 책 검색 API를 사용하여 검색 |
| 책 등록 | POST | /api/books | 책을 등록 (제목, 저자, 읽은 날짜, 메모 포함) |
| 책 목록 조회 | GET | /api/books | 사용자가 등록한 책 목록 조회 (무한 스크롤 지원) |
| 책 삭제 | DELETE | /api/books/:isbn | 특정 책 삭제 |
| 책 수정 | PATCH | /api/books/:isbn | 등록된 책의 정보를 수정 |

### **📊 인기 도서**
| 기능 | 메서드 | 엔드포인트 | 설명 |
|------|------|------|------|
| 인기 도서 조회 | GET | /api/recommended-books | 도서관 정보나루 API를 활용하여 인기 도서 가져오기 |

---

## 🧪 개발 목적
✅ **API 연동 연습**: 실제 백엔드 API와 프론트엔드를 연결하는 경험 쌓기  
✅ **인증 구현 실습**: JWT 기반 인증 시스템 적용 및 관리 방법 익히기  
✅ **외부 API 활용**: 카카오 책 검색 API, 도서관 정보나루 API 등 외부 서비스 연동 방법 학습  
✅ **무한 스크롤**: 프론트엔드에서 효율적인 데이터 로딩 기법 구현  
✅ **CRUD 기능**: 기본적인 데이터 생성, 조회, 수정, 삭제 기능 완성하기  

---

### 🧸 **별책부록** - 당신의 소중한 독서 기록을 품어주는 포근한 공간

