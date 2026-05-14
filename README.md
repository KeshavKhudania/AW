# AttendWise - Smart Attendance Tracker

![AttendWise Logo](https://lh3.googleusercontent.com/aida-public/AB6AXuBXMPpsKadhXRdMGAaylAbciwThbrekMR581REsE_psWSVb14M54V88_ZJyTWfO8Meh_8VoxOZLVv20v8KyfftzhN2AKZCpcQYzyVgWZYJR8oIhFd0GhVorY4tudLqPy5KwtGI238RgSr-DZKV7cTo4ADwEe59WBzbwmvkwGUEXaFQ-6sF2bm39GjVCpBvsuIGq7cR6uFyPlcYGT5sN0XB2RgaJNyoR7rGDVoPNTZGp-fy4DOcdOPm-OqVaurSTXe6MtAeQJpeVqcB3)

AttendWise is a sophisticated, natural-looking mobile application designed to simplify and modernize student attendance tracking. Built with React Native and powered by the **Academic Arbor** design system, it offers a seamless and premium experience for both students and academic institutions.

---

## 🌿 The Academic Arbor Design System

AttendWise features a unique design language that emphasizes trust, growth, and academic rigor.
- **Palette**: Forest Greens, Sage, and Dusty Rose for an organic yet professional feel.
- **Typography**: Clean, readable Inter font system for optimal information density.
- **Experience**: Smooth animations, glassmorphism elements, and intuitive layouts.

---

## 🚀 Key Features

- **Secure Authentication**: Robust login flow with device-bound session security.
- **Smart QR Scanning**: Forensic-grade QR scanner for instant attendance logging.
- **Attendance Dashboard**: Beautifully visualized statistics and progress tracking.
- **Academic Profile**: Comprehensive student identity and course enrollment management.
- **Theme Adaptive**: Modern light-mode aesthetic with planned dark-mode support.

---

## 🛠️ Technology Stack

- **Framework**: [React Native](https://reactnative.dev/) (v0.85)
- **State & Storage**: [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- **Networking**: [Axios](https://axios-http.com/)
- **UI Components**: Custom-built components following the Academic Arbor spec.
- **Design Platform**: [Stitch](https://stitch.com/)

---

## 📁 Project Structure

```text
AW/
├── src/
│   ├── components/       # Redesigned UI Components (Login, Home, Scanner, Profile)
│   ├── theme/            # Academic Arbor Design tokens (DesignSystem.ts)
│   └── assets/           # Local images and branding assets
├── android/              # Native Android configuration
├── ios/                  # Native iOS configuration
├── App.tsx               # Main application controller and navigation
└── index.js              # Entry point
```

---

## 🏁 Getting Started

### 1. Environment Setup
Ensure you have the [React Native Environment](https://reactnative.dev/docs/set-up-your-environment) configured for Android and/or iOS development.

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Metro Bundler
```bash
npm start
```

### 4. Run Application
**Android:**
```bash
npm run android
```

**iOS:**
```bash
# Install pods first
cd ios && pod install && cd ..
npm run ios
```

---

## 🛡️ Security & Privacy
AttendWise prioritizes student data privacy. All attendance logs are synchronized securely with the central institution portal via encrypted API endpoints.

---

## 📄 License
This project is proprietary and built for the AttendWise ecosystem.

---
*Nurturing Intellectual Growth through Smart Technology.*
