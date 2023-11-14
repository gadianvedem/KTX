$(document).ready(function () {
    const api = '/api.aspx';
    function delete_company(masv,json) {

    }
    function edit_company(masv, json) {
        var sv;
        for (var item of json.data) {
            if (item.masv == masv) {
                sv = item;
                break;
            }
        }
        var content = `form điền sẵn
        Mã sinh viên :<input type=text id="edit-masinhvien" value="${sv.masv}"><br>
        Họ và tên :<input type=text id="edit-tensinhvien" value="${sv.hoten}"><br>
        Ngày sinh :<input type=date id="edit-ngaysinhsinhvien" value="${sv.ngaysinh}">
        `
        $.confirm({
            title: 'edit sinh viên',
            content: content,
            columnClass: 'large',
            buttons: {
                save: {
                    action: function () {
                        var data_gui_di ={
                            action: 'edit_company',
                            masv : masv,
                            masv: $('#edit-masinhvien').val(),
                            hoten: $('#edit-tensinhvien').val(),
                            ngaysinh: $('#edit-ngaysinhsinhvien').val()
                        }
                        /*console.log(data_gui_di);*/
                        $.post(api, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            alert(json.msg);
                        })
                    }
                },
                cancel: {

                }
            }
        })

    }
    function list_sinhvien() {
        $.confirm({
            title: "Danh sách sinh viên",
            content: `<div id ="ds_sinh_vien">loading....</div>`,
            columnClass: 'large',
            onContentReady: function () {
                //alert('oke rồi đấy')
                $.post(api,
                    {
                        action: 'list_company'
                    },
                    function (data) {
                        var json = JSON.parse(data);
                        //alert(data)
                        var noi_dung_ds_sinh_vien = "";
                        var stt = 0;
                        if (json.ok) {
                            noi_dung_ds_sinh_vien += `<table class="table table-hover">"
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã sinh viên</th>
                                <th>Họ và tên</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>SDT</th>
                                <th>Lớp</th>
                                <th>Khoa</th>
                                <th>Sửa/Xóa</th>
                            </tr>
                            </thead><tbody>`;
                            for (var sv of json.data) {
                                var sua_xoa = `<button class="btn btn-sm btn-warning nut_sua_xoa" data-cid="${sv.masv}" data-action="edit_company">Sửa</button>`;
                                sua_xoa += ` <button class="btn btn-sm btn-warning nut_sua_xoa" data-cid="${sv.masv}" data-action="delete_company">Xóa</button>`;
                                noi_dung_ds_sinh_vien += `
                                <tr>
                                <td>${++stt}</td>
                                <td>${sv.masv}</td>
                                <td>${sv.hoten}</td>
                                <td>${sv.ngaysinh}</td>
                                <td>${sv.gioitinh}</td>
                                <td>${sv.sdt}</td>
                                <td>${sv.lop}</td>
                                <td>${sv.khoa}</td>
                                <td>${sua_xoa}</td>
                            </tr>
                                `
                            }
                            noi_dung_ds_sinh_vien += "</tbody></table>";
                        }
                        else {
                            noi_dung_ds_sinh_vien += "không có dữ liệu";
                        }

                        $('#ds_sinh_vien').html(noi_dung_ds_sinh_vien);// gán html vào thân diaglo
                        $('.nut_sua_xoa').click(function () {
                            var action = $(this).data('action')
                            var masv = $(this).data('cid')
                            if (action == 'delete_company') {
                                delete_company(masv, json);
                            }
                            else if (action == 'edit_company') {
                                edit_company(masv, json);
                            }
                        });
                    })
            }
        });
    }
    $('#nut-sinh-vien').click(function () {
        list_sinhvien();
    });
});
