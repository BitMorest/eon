https://stackoverflow.com/questions/47597283/electron-package-reduce-the-package-size

can remove
d3dcompiler_47.dll
LICENSE
LICENSES.chromium.html
libEGL.dll
libGLESv2.dll
version
vk_swiftshader.dll
vk_swiftshader_icd.json
vulkan-1.dll

### Git Commit Convention

> type(scope?): subject

The list of scopes
**featute**: A new feature
**fix**: A bug fix
**build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
**ci**: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
**chore**: add something without touching production code (Eg: update npm dependencies)
**docs**: Documentation only changes
**perf**: A code change that improves performance
**refactor**: A code change that neither fixes a bug nor adds a feature
**revert**: Reverts a previous commit
**style**: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
**test**: Adding missing tests or correcting existing tests

## TODO:

### features:

- Update angular show preload screen cho đến khi load xong

### chores:

Đợi angular ra phiên bản 15.1 để update
Đợi ngx-bootstrap ra phiên bản mới để update lên bootstrap 5.3 hoặc 5.2

### Style

Angular Material là một thư viện UI component tốt cho angular nó có hầu hết mọi thứ tuy nhiên chúng thiếu đi một số thành phần quan trọng như là Grid System làm cho việc sử dụng nó một cách độc lập là rất khó. Vì vậy Eon sử dụng grid tử bootstrap (Bởi vì nó đã được phát triển trong thời gian dài và hầu hết các developer đều biết hoặc quyen thuộc với nó). Ngoài ra tôi cũng lấy một số utilities từ bootstrap như
là hệ thống display, flex, float, spacing từ bootstrap. Chi tiết các thành phần ở bên dưới

1. Hệ thống grid thừa hưởng từ Bootstrap

A. Layout

- **Brakepoint**: https://getbootstrap.com/docs/5.2/layout/breakpoints/
- **Container**: https://getbootstrap.com/docs/5.2/layout/containers/
- **Grid**: https://getbootstrap.com/docs/5.2/layout/grid/
- **Columns**: https://getbootstrap.com/docs/5.2/layout/columns/
- **Gutter**: https://getbootstrap.com/docs/5.2/layout/gutters/
-

B. Utilities

- **Display**: https://getbootstrap.com/docs/5.2/utilities/display/
- **Flex**: https://getbootstrap.com/docs/5.2/utilities/flex/
- **Float**: https://getbootstrap.com/docs/5.2/utilities/float/
- **Spacing**: https://getbootstrap.com/docs/5.2/utilities/spacing/
- **Text**: https://getbootstrap.com/docs/5.2/utilities/text/ _(Except text transform let's use pipe in angular for alternate and except Mono Space)_
