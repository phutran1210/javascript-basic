

var mangMenu = []
function LoadMenu() {
    //Gọi axios lấy dữ liệu từ api về
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/quanlymenu/laydanhsachmenu',
        method: 'get',
        responseType: 'json'
    });
    promise.then(renderMenu).catch(function (error) {

    })
}
//callback funtion được gọi trong hàm then từ promise sau khi gọi api
function renderMenu(result) {
    mangMenu = result.data;
    //render data từ api trả về ra giao diện
    var contentMenu = '';
    for (var i = 0; i < mangMenu.length; i++) {
        var menu = mangMenu[i];
        console.log(menu);
        contentMenu += `
        <div class="row">
            <div class="col-md-12">
                <h3>${menu.TenDanhMuc} <i class="edit">sửa</i> <i class="delete">xóa</i></h3>
                <div class="row">
                    ${renderMenuItem(menu.DanhSachMonAn)}
                </div>
            </div>
        </div>
        `
    }

    document.getElementById('content-menu').innerHTML = contentMenu;
};

function renderMenuItem(mangDanhSachMonAn) {
    console.log(mangDanhSachMonAn);
    var contentMenuItem = '';
    //Duyệt thuộc tính mảng món ăn của menu
    for (var i = 0; i < mangDanhSachMonAn.length; i++) {
        var monAn = mangDanhSachMonAn[i];
        contentMenuItem += `
        <div class="col-6">
            <p>${monAn.TenMonAn}</p>
        </div>
        <div class="col-2">
            <img src="${monAn.HinhAnh}" width="35" height="35">
        </div>
        <div class="col-4">
            <p>${monAn.Gia} đồng</p>
        </div>
        `
    }

    return contentMenuItem;
}

LoadMenu();


//Nghiệp vụ thêm menu 

document.getElementById("btnThemMenu").onclick = function () {
    let object = {
        "DanhSachMonAn": [
            {
                "MaMonAn": "LauThai",
                "TenMonAn": "Lẩu thái",
                "HinhAnh": "https://daynauan.info.vn/wp-content/uploads/2018/06/lau-kim-chi-hai-san.jpg",
                "Gia": "250000"
            },
            {
                "MaMonAn": "LauThapCam",
                "TenMonAn": "Lẩu thập cẩm",
                "HinhAnh": "https://massageishealthy.com/wp-content/uploads/2019/05/cach-nau-lau-thap-cam-hai-san-chua-cay-lau-thap-cam-gom-nhung-gi-1.jpg",
                "Gia": "350000"
            }
        ],
        "MaDanhMuc": "Lau_123",
        "TenDanhMuc": "Lẩu 123",
        "HinhAnh": "string"
    }

    //Gọi api backend
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyMenu/TaoMenu',
        method: 'post',
        data: object,
        responseType: 'json'
    });
    promise.then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(error);
    });
}






// function main (callback){
//     console.log(callback)
//     var title = "hello cybersoft";
//     callback(title);
// }

// function renderH1(title){
//     document.querySelector('body').innerHTML = `<h1>${title}</h1>`;
// }

// function renderP (title) {
//     document.querySelector('body').innerHTML = `<p>${title}</p>`;
// }

// main(renderP);


document.getElementById('btnAdd').onclick = function () {
    
    var htmlMonAn = `<div class="mon-an">
    <div class="form-group row">
      <div class="col-6 mt-2">
        <input class="form-control" placeholder="Mã món">
      </div>
      <div class="col-6 mt-2">
        <input class="form-control" placeholder="Tên món">
      </div>
      <div class="col-6 mt-2">
        <input class="form-control" placeholder="Giá món">
      </div>
      <div class="col-6 mt-2">

        <input class="form-control" placeholder="Link hình">
      </div>
    </div>
    <div class="text-right"><button class="btnXoa btn-danger">Xóa </button></div>

  </div>`
    document.querySelector(".danh-sach-mon-an").innerHTML += htmlMonAn;
    createEventBtnXoa();
}

//Chức năng button xóa menu
function createEventBtnXoa() {
    var arrBtnXoa = document.getElementsByClassName('btnXoa');
    for (var i = 0; i < arrBtnXoa.length; i++) {
        arrBtnXoa[i].onclick = function () {
            this.closest('.mon-an').remove();
        }
    }
}
createEventBtnXoa();
