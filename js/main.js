// Tạo function constructor Employee để giúp khởi tạo nhanh các object employee
function Employee(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLam
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCoBan = luongCoBan;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
}

//Tạo prototype tính tổng lương và xếp loại nhân viên cho function contructor
//Tính lương:
Employee.prototype.salary = function () {
  switch (this.chucVu) {
    case "Sếp":
      return this.luongCoBan * 3;
    case "Trưởng phòng":
      return this.luongCoBan * 2;
    case "Nhân Viên":
      return this.luongCoBan;
  }
};
//Xếp loại nhân viên:
Employee.prototype.getRank = function () {
  if (this.gioLam >= 192) {
    return "Xuất sắc";
  } else if (this.gioLam >= 176) {
    return "Giỏi";
  } else if (this.gioLam >= 160) {
    return "Khá";
  } else {
    return "Trung bình";
  }
};

//Tạo array employees
let employees = [];

//====================================================================================================================

//Tạo function thêm nhân viên
function addEmployee() {
  //DOM
  let taiKhoan = dom("#tknv").value;
  let hoTen = dom("#name").value;
  let email = dom("#email").value;
  let matKhau = dom("#password").value;
  let ngayLam = dom("#datepicker").value;
  let luongCoBan = +dom("#luongCB").value;
  let chucVu = dom("#chucvu").value;
  let gioLam = +dom("#gioLam").value;

  //Kiểm tra thông tin input có hợp lệ hay không, nếu ko thì sẽ dừng hàm
  let form = validateForm();
  if (!form) {
    return;
  }

  //Tạo object employee chứa các thông tin trên
  let employee = new Employee(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );

  //Thêm object employee vào mảng employees
  employees.push(employee);

  //Hiện thị ra bảng
  display(employees);

  //Gọi hàm resetForm để reset lại khung Input
  resetForm();
}

//Tạo function xóa nhân viên dùng filter để lọc mảng và xóa nhân viên theo tài khoản
function deleteEmployee(taiKhoan) {
  employees = employees.filter((employee) => {
    return employee.taiKhoan !== taiKhoan;
  });

  //Gọi hàm display để hiện thị lại mảng mới sau khi xóa
  display(employees);
}

//Function selectEmployee để sau khi nhấn edit sẽ fill thông tin lên khung input
function selectEmployee(taiKhoan) {
  //Dùng find để tim phần tử trong mảng employees có taiKhoan như trên
  let employee = employees.find((employee) => {
    return employee.taiKhoan === taiKhoan;
  });

  if (!employee) {
    return;
  }

  //Fill các thông tin của object employee mới tìm dc ở trên lên khung input
  dom("#tknv").value = employee.taiKhoan;
  dom("#name").value = employee.hoTen;
  dom("#email").value = employee.email;
  dom("#password").value = employee.matKhau;
  dom("#datepicker").value = employee.ngayLam;
  dom("#luongCB").value = employee.luongCoBan;
  dom("#chucvu").value = employee.chucVu;
  dom("#gioLam").value = employee.gioLam;

  //Disable khung input của tài khoản và nút thêm người dùng
  dom("#tknv").disabled = true;
  dom("#btnThemNV").disabled = true;
}

//Tạo function cập nhật nhân viên
function updateEmployee() {
  //DOM
  let taiKhoan = dom("#tknv").value;
  let hoTen = dom("#name").value;
  let email = dom("#email").value;
  let matKhau = dom("#password").value;
  let ngayLam = dom("#datepicker").value;
  let luongCoBan = +dom("#luongCB").value;
  let chucVu = dom("#chucvu").value;
  let gioLam = +dom("#gioLam").value;

  //Kiểm tra xem thông tin input có hợp lệ hay ko, nếu ko thì sẽ dừng hàm
  let form = validateForm();
  if (!form) {
    return;
  }

  //Tạo object employee chứa các thông tin trên
  let employee = new Employee(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );

  //DÙng findIndex để tìm index object trong mảng employees có taiKhoan trùng với taiKhoan đang edit phía trên
  let index = employees.findIndex((object) => {
    return object.taiKhoan === employee.taiKhoan;
  });

  //Sau khi tìm dc index ta cập nhật lại object có index đó trong mảng employees
  employees[index] = employee;

  //Gọi hàm display để hiện thị ra bảng
  display(employees);

  //Gọi hàm resetForm để reset lại khung input
  resetForm();
}

//Tạo function tìm kiếm nhân viên theo xếp loại
function searchEmployee() {
  //DOM
  let searchValue = dom("#searchName").value;

  searchValue = searchValue.toLowerCase();

  let searchEmployee = employees.filter((employee) => {
    let rank = employee.getRank().toLowerCase();

    return rank.includes(searchValue);
  });

  display(searchEmployee);
}

//====================================================================================================================

//DOM
function dom(selector) {
  return document.querySelector(selector);
}

//Tạo hàm display giúp hiển thị ra bảng
function display(employees) {
  let html = employees.reduce((result, employee) => {
    return (
      result +
      `
            <tr>
            <td>${employee.taiKhoan}</td>
            <td>${employee.hoTen}</td>
            <td>${employee.email}</td>
            <td>${employee.ngayLam}</td>
            <td>${employee.chucVu}</td>
            <td>${employee.salary()}</td>
            <td>${employee.getRank()}</td>
            <td>
            <button class="btn btn-success" onclick="selectEmployee('${
              employee.taiKhoan
            }')" data-toggle="modal"
            data-target="#myModal">Edit</button>
            
            <button class="btn btn-danger" onclick="deleteEmployee('${
              employee.taiKhoan
            }')">Delete</button>
            </td>
            </tr> 
            `
    );
  }, "");

  dom("#tableDanhSach").innerHTML = html;
}

//Tạo hàm resetForm để giúp reset lại các khung input về chuỗi rỗng
function resetForm() {
  dom("#tknv").value = "";
  dom("#name").value = "";
  dom("#email").value = "";
  dom("#password").value = "";
  dom("#datepicker").value = "";
  dom("#luongCB").value = "";
  dom("#chucvu").value = "";
  dom("#gioLam").value = "";

  dom("#tknv").disabled = false;
  dom("#btnThemNV").disabled = false;
}

//====================================================================================================================

//Validation

//Hàm kiểm tra tài khoản có hợp lệ hay ko
function validateTaiKhoan() {
  //DOM
  let taiKhoan = dom("#tknv").value;
  let spanEl = dom("#tbTKNV");
  spanEl.style.display = "block";
  //Xét trường hợp input rỗng:
  if (!taiKhoan) {
    spanEl.innerHTML = "Tài khoản không được để trống";
    return false;
  }

  //Xét trường hợp phải có từ 4 đến 6 kí tự:
  if (taiKhoan.length < 4 || taiKhoan.length > 6) {
    spanEl.innerHTML = "Tài khoản phải có từ 4 đến 6 kí số";
    return false;
  }

  //Xét trường hợp có phải là kí số hay không:
  let regex = /^[0-9]+$/;
  if (!regex.test(taiKhoan)) {
    spanEl.innerHTML = "Tài khoản phải là kí số";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

//Hàm kiểm tra tên nhân viên có hợp lệ hay ko
function validateTenNV() {
  //DOM
  let tenNV = dom("#name").value;
  let spanEl = dom("#tbTen");
  spanEl.style.display = "block";

  //Kiểm tra trường hợp tên nhân viên để trống hay ko
  if (!tenNV){
    spanEl.innerHTML = "Tên nhân viên không được để trống"
    return false;
  }

  //Kiểm tra trường hợp tên nhân viên có phải là chữ hay ko
  let regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  if (!regex.test(tenNV)){
    spanEl.innerHTML = "Tên nhân viên chỉ bao gồm chữ cái"
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

//Hàm kiểm tra email có hợp lệ hay ko 
function validateEmail() {
  //DOM
  let email = dom("#email").value;
  let spanEl = dom("#tbEmail");
  spanEl.style.display = "block";

  //Trường hợp email có để trống hay ko
  if (!email){
    spanEl.innerHTML = "Email không được để trống";
    return false;
  }

  //Trường hợp email có đúng định dạng hay ko
  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(email)){
    spanEl.innerHTML = "Email không đúng định dạng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

//Hàm kiểm tra mật khẩu có hợp lệ hay ko
function validateMK(){
 //DOM
 let matKhau = dom("#password").value;
 let spanEl = dom("#tbMatKhau");
 spanEl.style.display = "block";

 //Trường hợp mật khẩu có để trống hay ko
 if (!matKhau){
   spanEl.innerHTML = "Mật khẩu không được để trống";
   return false;
 }

 //Trường hợp mật khẩu có đủ 6-10 kí tự hay ko
 if (matKhau.length < 6 || matKhau.length >10){
  spanEl.innerHTML = "Mật khẩu phải từ 6 đến 10 kí tự";
  return false;
 }

 //Trường hợp mật khẩu có đúng định dạng hay ko
 let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])/;
 if (!regex.test(matKhau)){
   spanEl.innerHTML = "Mật khẩu phải chứa ít nhất 1 kí số, 1 chữ in hoa và 1 kí tự đặc biệt";
   return false;
 }

 spanEl.innerHTML = "";
 return true;
}

//Hàm kiểm tra ngày làm có hợp lệ hay ko
function validateNgayLam() {
  //DOM
  let ngayLam = dom("#datepicker").value;
  let spanEl = dom("#tbNgay");
  spanEl.style.display = "block";

  //Kiểm tra trường hợp ngày làm để trống hay ko
  if (!ngayLam){
    spanEl.innerHTML = "Ngày làm không được để trống"
    return false;
  }

  //Kiểm tra trường hợp ngày làm có đúng định dạng hay ko
  let regex = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;
  if (!regex.test(ngayLam)){
    spanEl.innerHTML = "Ngày làm phải theo định dạng mm/dd/yyyy"
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

//Hàm kiểm tra lương cơ bản có hợp lệ hay ko
function validateLuongCB() {
  //DOM
  let luongCB = +dom("#luongCB").value;
  let spanEl = dom("#tbLuongCB");
  spanEl.style.display = "block";

  //Kiểm tra trường hợp lương cơ bản để trống hay ko
  if (!luongCB){
    spanEl.innerHTML = "Lương cơ bản không được để trống"
    return false;
  }

  //Kiểm tra trường hợp lương cơ bản có đúng từ 1000000 đến 20000000 hay ko
  if (luongCB < 1e+6 || luongCB > 20e+6){
    spanEl.innerHTML = "Lương cơ bản phải từ 1 triệu đến 20 triệu"
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

//Hàm kiểm tra chức vụ có hợp lệ hay ko
function validateChucVu() {
  //DOM
  let chucVu = dom("#chucvu").value;
  let spanEl = dom("#tbChucVu");
  spanEl.style.display = "block";

  //Kiểm tra trường hợp chức vụ để trống hay ko
  if (chucVu === ""){
    spanEl.innerHTML = "Hãy chọn chức vụ"
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

//Hàm kiểm tra số giờ làm có hợp lệ hay ko
function validateGioLam() {
  //DOM
  let gioLam = +dom("#gioLam").value;
  let spanEl = dom("#tbGiolam");
  spanEl.style.display = "block";

  //Kiểm tra trường hợp giờ làm để trống hay ko
  if (!gioLam){
    spanEl.innerHTML = "Giờ làm không được để trống"
    return false;
  }

  //Kiểm tra trường hợp giờ làm có đúng từ 80 đến 200 hay ko
  if (gioLam < 20 || gioLam > 200){
    spanEl.innerHTML = "Giờ làm phải từ 80 đến 200"
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

//Hàm kiểm tra form input có hợp lệ hay ko
function validateForm() {
  let form = true;

  form = validateTaiKhoan() & validateTenNV() & validateEmail() & validateMK() & validateNgayLam() & validateLuongCB() & validateChucVu() & validateGioLam();

  if (!form) {
    alert("Thông tin không hợp lệ");
    return false;
  }

  return true;
}
