# HR Toolkit (抽籤與分組工具)

這是一個現代化的人力資源管理工具，專為公司活動設計，提供抽籤與分組功能。

## 技術堆疊

*   **Framework:** React 19 + TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (CDN)
*   **Deployment:** GitHub Pages

## 快速開始

### 安裝依賴

在專案根目錄執行：

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器並訪問終端機顯示的網址（通常是 `http://localhost:3000`）。

### 建置專案

```bash
npm run build
```

建置後的檔案會位於 `dist` 資料夾。

## 部署

本專案已設定 GitHub Actions 自動部署至 GitHub Pages。
只要將 `main` 分支推送到 GitHub，工作流程就會自動執行並部署。

請確保 GitHub Repo 的 Settings > Pages 中，Source 設定為 **GitHub Actions**。

## 專案結構

*   `src/components`: 應用程式元件
*   `src/utils`: 通用工具函式
*   `src/types.ts`: TypeScript 型別定義
