/* Gogo Textos de Lenguaje

Tabla de Contenido

01.General
02.Inicio de sesión de usuario, cierre de sesión, registro
03.Menú
04.Tableros
05.Esquemas
06.Aplicaciones
  06.01.Chatea
  06.02.Encuesta
  06.03.Notas
07.IU
  07.01.Alertas
  07.02.Badges
  07.03.Botones
  07.04.Tarjetas
  07.05.Carrusel
  07.06.Gráficos
  07.07.Colapso
  07.08.Desplegables
  07.09.Editores
  07.10.Formularios
  07.11.Componentes
  07.12.Iconos
  07.13.Grupos de Entrada
  07.14.Jumbotron
  07.15.Modal
  07.16.Navegación
  07.17.Tooltips y Popovers
  07.18.Ordenable
*/

module.exports = {
  /* 01.General */
  "general.copyright": "Gogo React © Todos los derechos reservados.",

  /* Setting */
  "setting.locale-vie": "Tiếng Việt",
  "setting.locale-eng": "Tiếng Anh",

  /* 02.Người dùng đăng nhập, đăng ký, đăng xuất */
  "user.title-page": "CHÀO MỪNG ĐẾN VỚI SPEEDLINK",
  "user.login-text-1": "Vui lòng sử dụng tài khoản của bạn để đăng nhập.",
  "user.login-text-2": "Nếu bạn không phải là thành viên, vui lòng",
  "user.login-text": "đăng nhập",
  "user.register-text": "đăng ký",
  "user.login-title": "Đăng nhập",
  "user.register": "Đăng ký",
  "user.forgot-password": "Quên mật khẩu",
  "user.username": "Email",
  "user.password": "Mật khẩu",
  "user.forgot-password-question": "Quên mật khẩu?",
  "user.fullname": "Họ tên",
  "user.login-button": "ĐĂNG NHẬP",
  "user.register-button": "ĐĂNG KÝ",
  "user.reset-password-button": "RESET",

  /* 03.Menu */
  "menu.app": "Trang chủ",
  "menu.dashboards": "Điều khiển",
  "menu.master-data": "Master Data",
  "menu.status": "Trạng Thái",
  "menu.address": "Địa chỉ",
  "menu.hub": "Hub",
  "menu.search": "Tìm kiếm",
  "menu.login": "Đăng nhập",
  "menu.register": "Đăng ký",
  "menu.forgot-password": "Quên mật khẩu",
  "menu.address_code": "Code",
  "menu.address_country": "Quốc gia",
  "menu.address_city": "Tỉnh/Thành Phố",
  "menu.address_district": "Quận/Huyện",
  "menu.address_ward": "Phường/Xã",

  /* Master Data - Status */
  "status.add-new": "Tạo mới trạng thái",
  "status.update": "Cập nhật trạng thái",
  "status.name": "Tên",
  "status.description": "Mô tả",
  "status.status": "Trạng thái",
  "status.all": "Tất cả",
  "status.active": "Kích hoạt",
  "status.inactive": "Không kích hoạt",
  "status.search": "Tìm kiếm",
  "status.clear": "Làm mới",
  "status.action": "Hành động",
  "status.export": "Xuất",
  "status.cancel": "Hủy",
  "status.submit": "Lưu",
  "status.title-confirm": "Bạn chắc chắn?",
  "status.desc-confirm": "Bạn muốn xóa trạng thái này?",
  "status.confirm-no": "Không",
  "status.confirm-yes": "Có, xóa nó!",

  /* Master Data - Address */
  "address.code": "Code",
  "address.zip-code": "Mã bưu chính",
  "address.country": "Đất nước",
  "address.city": "Tỉnh/Thành phố",
  "address.district": "Quận/Huyện",
  "address.ward": "Phường/Xã",
  "address.brand-code": "Brand Code",
  "address.hub-code": "Hub Code",
  "address.action": "Hành động",
  "address.export": "Xuất",

  /* Master Data - Address - Country */
  "country.add-new": "Tạo mới đất nước",
  "country.update": "Cập nhật đất nước",
  "country.name": "Tên",
  "country.description": "Mô tả",
  "country.iso-code": "Mã ISO",
  "country.status": "Trạng thái",
  "country.created-at": "Ngày tạo",
  "country.action": "Hành động",
  "country.all": "Tất cả",
  "country.active": "Kích hoạt",
  "country.inactive": "Không kích hoạt",
  "country.search": "Tìm kiếm",
  "country.clear": "Làm mới",
  "country.export": "Xuất",
  "country.cancel": "Hủy",
  "country.submit": "Lưu",

  /* Master Data - Address - City */
  "city.add-new": "Tạo mới thành phố",
  "city.update": "Cập nhật thành phố",
  "city.name": "Tên",
  "city.description": "Mô tả",
  "city.zip-code": "Zip Code",
  "city.status": "Trạng thái",
  "city.created-at": "Ngày tạo",
  "city.action": "Hành động",
  "city.all": "Tất cả",
  "city.active": "Kích hoạt",
  "city.inactive": "Không kích hoạt",
  "city.search": "Tìm kiếm",
  "city.clear": "Làm mới",
  "city.export": "Xuất",
  "city.cancel": "Hủy",
  "city.submit": "Lưu",
  "city.country": "Đất nước",

  /* Master Data - Status */
  "hub.add-new": "Tạo mới Hub",
  "hub.update": "Cập nhật Hub",
  "hub.name": "Tên",
  "hub.status": "Trạng thái",
  "hub.all": "Tất cả",
  "hub.active": "Kích hoạt",
  "hub.inactive": "Không kích hoạt",
  "hub.search": "Tìm kiếm",
  "hub.clear": "Làm mới",
  "hub.description": "Mô tả",
  "hub.action": "Hành động",
  "hub.export": "Xuất",
  "hub.cancel": "Hủy",
  "hub.submit": "Lưu",
  "hub.title-confirm": "Bạn chắc chắn?",
  "hub.desc-confirm": "Bạn muốn xóa trạng thái này?",
  "hub.confirm-no": "Không",
  "hub.confirm-yes": "Có, xóa nó!",
  
};
