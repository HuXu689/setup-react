# Welcome to Setup-React

This is sample for project react. Use react-router

List of tools used:

- Prettier, ESLint, Husky và committlint

1. Giải thích file
   tsconfig.jso : chứa các edit về typescript
   react-router.config.ts: bật tắt chế độ SSR hoặc CSR (SSR cần cài nodejs để chạy, CSR không cần: theo dõi thư mục build, buld trước start:csr sau)
   package.json: chứa dependences của dự án (build: build sourcecode để deploy, start: để deploy, dev: chạy code, typecheck: kiểm tra có lỗi cú pháp ts không)
   .gitignore: chứa các thư mục không cần đẩy lên git
   app>root.tsx: chứa metadata dùng cho SEO
   .editorconfig: Thống nhất cách viết code (thụt dòng, xuống dòng, charset…) giữa các máy và IDE
   .prettierrc: Cấu hình cách Prettier tự động format code. Cài format on save để tự động format code khi lưu file
   .prettierignore: Không format những file/thư mục được ghi vào
2. Các bước setup

- Tạo dự án react router: npx create-react-router@latest setup-react
- Cài vite-plugin-devtools-json(Node version>=20: nvm use 22.14.0): npm install -D vite-plugin-devtools-json
- import devtoolsJson from "vite-plugin-devtools-json" trong vite.config.ts và thêm devtoolsJson() trong plugin
- Cài extensions cho vs code: EditorConfig for VS Code, Prettier - Code formatter, Material Icon Theme, ESLint
- Tạo file: .editorconfig, .prettierrc, .prettierignore, eslint.config.js
- Đến (3.)
- Đến (4.)
- Đến (5.)
- Thêm vào scripts package.json: "start:csr": "vite preview --port 3000"

3. Format code all file with prettier

- Cài thư viện: npm i prettier -D
- Thêm vào scripts package.json: "prettier": "prettier --check .", "prettier:fix": "prettier --write ."
- Chạy: npm run prettier, npm run prettier:fix

4. Format eslint all file: Kiểm tra code style

- Sửa file eslint.config.js theo https://github.com/vitejs/vite/blob/main/packages/create-vite/template-react-ts/eslint.config.js
- Thêm globalIgnores(['dist', 'build', 'node_modules', 'react-router', 'coverage', 'public', 'out', 'lib']) để loại bỏ thư mục không cần theo eslint
- Cài thư viện theo file eslint.config.js
- Thêm vào scripts package.json: "lint": "eslint .", "lint:fix": "eslint . --fix"
- Chạy: npm run lint, npm run lint:fix

5. Dùng alias: Thay vì ../ viết thành ~/

- Vào settings của vs code tới Import Module Specifier
- Sửa JavaScript › Preferences: Import Module Specifier và TypeScript › Preferences: Import Module Specifier thành non-relative
- Muốn thêm các alias khác: vào tsconfig.json thêm vào phần "paths" của "compilerOptions": "@/_": ["../app/_"] (ví dụ)

6. Thay đổi port

- Sửa vite.config.ts:
  export default defineConfig({
  server:{
  port: 3000, // Port for the development server
  host: true, // Allow access from other devices on the network
  strictPort: true, // Prevent the server from trying to use another port if 3000 is already in use
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), devtoolsJson()],
  })

7. Bật tắt sourcemap CSS khi dev: để hiển thị css của file nào khi kiểm tra phần tử

- Sửa vite.config.ts thêm:
  css: {
  devSourcemap: true, // Enable sourcemap CSS when dev
  },

8. Cài Husky và committlint: Tự động chạy các lệnh trước khi commit/push code (Như check format code prettier hay eslint), kiểm tra chặn commit sai cú pháp:
   Ví dụ mục đích và cách viết
   Thêm tính năng: "feat: thêm trang giỏ hàng"
   Sửa lỗi: "fix: sửa lỗi đăng nhập"
   Cập nhật phụ: "chore: update dependencies"
   Refactor code: "refactor: tách component"
   Viết test: "test: thêm test cho nút Save"

- Tạo file commitlint.config.cjs:
  module.exports = {
  extends: ['@commitlint/config-conventional'],
  }
- Cài thư viện: npm install --save-dev husky @commitlint/config-conventional @commitlint/cli
- Khởi tạo Husky: npx husky install
- Thêm vào scripts package.json: "prepare": "husky install"
- Tạo Git hook để kiểm tra message commit(Tạo file .husky/commit-msg): npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$
- Tạo file .gitattributes để tự động chuyển CRLF → LF khi commit: "\* text=auto"

- Sửa file commit-msg (Trong foulder .husky):
  #!/usr/bin/env sh
  npx --no -- commitlint --edit "$1"
- Sửa file pre-commit (Trong foulder .husky):
  #!/usr/bin/env sh
  npm run lint
  npm run prettier:fix

9. Tip dùng git:

- git gcam "feat: thêm chức năng tìm kiếm" || git commit -am "feat: thêm chức năng tìm kiếm" : Tự động git add và git commit
- git gp || git push : Đẩy code lên GitHub
- git gst || git status : Kiểm tra trạng thái file
- git gco <branch> || git checkout <branch> : Chuyển nhánh
- git gcb <branch> || git checkout -b <branch> : Tạo nhánh mới
- git gl || git log --oneline --graph --decorate --all : Xem lịch sử commit dạng cây
  Cách setup:
  git config --global alias.gcam 'commit -am'
  git config --global alias.gp 'push'
  git config --global alias.gst 'status'
  git config --global alias.gco 'checkout'
  git config --global alias.gcb 'checkout -b'
  git config --global alias.gl 'log --oneline --graph --decorate --all'

git rebase -i HEAD~8 || git rev-list --count HEAD: sửa log commit
đổi pick thành squash để gộp commit>nhấn esc>gõ:wq>enter
git push origin master --force: push lại code ghi đè lịch sử commit của local lên repo
git rebase --abort: hủy bỏ quá trình rebase

10. Cấu trúc thư mục
    /app
    Thư mục gốc chứa toàn bộ mã nguồn của ứng dụng. Đây là nơi tập trung toàn bộ logic frontend, giao diện người dùng, định tuyến, API, cấu hình, và quản lý trạng thái. Mọi phát triển đều diễn ra bên trong thư mục này.
    /assets
    Lưu trữ các tệp tĩnh như ảnh (.png, .svg), font, CSS thô,... Những tài nguyên này thường được import trực tiếp vào component hoặc layout.
    /components
    Chứa các component tái sử dụng được dùng xuyên suốt ứng dụng.
    /ui: Các khối giao diện nhỏ như Button, Input, Modal, thường không chứa logic.
    /layouts: Các phần layout nhỏ lặp lại như Navbar, Sidebar, Footer, dùng kết hợp trong layout chính.
    /config
    Chứa cấu hình toàn cục cho app:
    -- axios.ts: Khởi tạo instance Axios mặc định.
    -- env.ts: Load và validate biến môi trường.
    -- theme.ts: Quản lý light/dark theme và các token màu sắc.
    /context
    Nơi quản lý global state bằng Context API. Ví dụ như AuthContext, ThemeContext, hoặc UserSettingsContext.
    /data
    Chứa dữ liệu tĩnh, cấu hình mẫu, hoặc dữ liệu giả lập dùng khi dev. Ví dụ: danh sách sản phẩm mẫu, danh mục, hoặc các enum.
    /features
    Tổ chức mã nguồn theo tính năng (feature-based folder structure). Mỗi module là một đơn vị độc lập, ví dụ auth/, cart/, profile/.
    //components: Component nội bộ của feature.
    //pages: Trang liên quan đến feature.
    -- auth.routes.tsx: File định nghĩa route riêng cho module.
    -- index.ts: Export các thành phần chính của feature.
    /hooks
    Lưu các custom hooks dùng chung trong toàn bộ ứng dụng. Ví dụ: useAuth, useDebounce, useTheme.
    /layouts
    Chứa các layout tổng thể của ứng dụng như MainLayout, AuthLayout, AdminLayout. Thường kết hợp với <Outlet /> của React Router.
    /lib
    Chứa các hàm logic thuần (pure functions), xử lý không phụ thuộc React. Ví dụ: calculateCartTotal, filterProductByCategory,...
    /pages
    Chứa các trang cấp cao trong ứng dụng. Mỗi thư mục đại diện một route, thường chỉ đơn giản là trang đơn như /home, /about, /dashboard.
    /routes
    Quản lý cấu hình định tuyến toàn bộ ứng dụng:
    -- privateRoutes.ts: Các route yêu cầu đăng nhập.
    -- publicRoutes.ts: Route không yêu cầu đăng nhập.
    -- index.tsx: Router tổng hợp cho toàn app (<BrowserRouter><Routes>...</Routes></BrowserRouter>).
    /services
    Chứa các hàm gọi API, thường dùng Axios hoặc fetch. Tách riêng logic gọi server khỏi component UI.
    -- userService.ts: Gọi API liên quan tới người dùng.
    -- authService.ts: Xử lý đăng nhập, đăng ký, refresh token,...
    /store
    Quản lý trạng thái toàn cục bằng Redux hoặc Zustand:
    -- index.ts: Tạo store và combine reducers.
    //slices: Các slice theo từng domain, như authSlice, userSlice.
    /types
    Khai báo các kiểu dữ liệu TypeScript cho toàn ứng dụng.
    -- auth.ts: Định nghĩa kiểu AuthResponse, UserCredential.
    -- user.ts: Interface cho người dùng.
    -- index.ts: Re-export hoặc lưu type chung.
    /utils
    Các hàm tiện ích (helper functions) tái sử dụng:
    -- formatDate.ts: Định dạng ngày giờ.
    -- debounce.ts: Hàm debounce cho input.
    -- validateEmail.ts: Kiểm tra định dạng email,...
    /welcome
    Trang chào mừng hoặc landing page ban đầu. Có thể chứa:
    -- welcome.tsx: Component chính.
    -- logo-light.svg / logo-dark.svg: Logo sáng/tối.
    -- app.css
    Tệp định nghĩa style toàn cục. Có thể chứa Tailwind base layer, reset styles,...
    -- root.tsx
    Layout root chính dùng trong React Router. Đây là nơi chứa <Outlet />, <ScrollRestoration />, và có thể dùng cho error boundary toàn app.
    -- routes.ts
    Alias để re-export router hoặc phân chia router nếu cấu trúc phức tạp.
    -- App.tsx
    Component chính khởi đầu cho ứng dụng. Dùng để wrap RouterProvider hoặc <BrowserRouter>, kết nối layout, context,...
    -- main.tsx
    Điểm vào của ứng dụng.

/public/------------------------# Các tệp tĩnh (favicon, index.html, manifest.json)
/app/---------------------------# Mã nguồn chính
│
├── assets/---------------------# Ảnh, font, icons, CSS, SCSS ...
│
├── components/-----------------# Các component dùng chung
│ ├── ui/---------------------# Component giao diện (Button, Modal, Input)
│ └── layouts/---------------# Layout cụ thể (Navbar, Sidebar, Footer...)
│
├── config/---------------------# Cấu hình toàn cục
│ ├── axios.ts---------------# Cấu hình Axios
│ ├── env.ts-----------------# Biến môi trường
│ └── theme.ts---------------# Theme light/dark
│
├── context/--------------------# Context API (AuthContext, ThemeContext...)
│
├── data/-----------------------# Dữ liệu tĩnh hoặc giả lập (mockData, constants)
│
├── features/-------------------# Mỗi feature là 1 module độc lập (Auth, Product,...)
│ ├── auth/
│ │ ├── components/--------# Component riêng của feature
│ │ ├── pages/-------------# Trang liên quan đến Auth
│ │ ├── auth.routes.tsx----# Route nội bộ
│ │ └── index.ts-----------# Entry point feature
│ └── ...
│
├── hooks/----------------------# Custom hooks dùng chung toàn dự án
│ └── useAuth.ts
│
├── layouts/--------------------# Layout tổng thể (MainLayout, AuthLayout)
│
├── lib/------------------------# Hàm logic thuần, formatter, validators,...
│
├── pages/----------------------# Các trang độc lập (trong hoặc ngoài feature)
│ ├── Home/
│ ├── About/
│ └── Dashboard/
│
├── routes/---------------------# Định nghĩa route chính
│ ├── privateRoutes.ts--------# Route yêu cầu đăng nhập
│ ├── publicRoutes.ts---------# Route không yêu cầu đăng nhập
│ └── index.tsx---------------# Router tổng hợp
│
├── services/-------------------# API services
│ ├── userService.ts
│ └── authService.ts
│
├── store/----------------------# Global state management
│ ├── index.ts----------------# Combine reducers/store
│ └── slices/-----------------# Redux slices / Zustand logic
│ --├── authSlice.ts
│ --└── userSlice.ts
│
├── types/----------------------# TypeScript types
│ ├── auth.ts
│ ├── user.ts
│ └── index.ts
│
├── utils/----------------------# Hàm tiện ích (formatDate, debounce, validateEmail...)
│ ├── formatDate.ts
│ ├── debounce.ts
│ └── validateEmail.ts
│
├── welcome/--------------------# Trang chào mừng / intro
│ ├── logo-dark.svg
│ ├── logo-light.svg
│ └── welcome.tsx
│
├── app.css---------------------# Style toàn cục
├── root.tsx--------------------# Root layout (thường dùng với Router)
├── routes.ts-------------------# Alias: export router chính (nếu cần)
├── App.tsx---------------------# Root App component (có thể gọi <AppRouter/>)
└── main.tsx--------------------# Entry point khởi chạy React
