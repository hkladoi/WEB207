function showHideOptions() {
    var category = document.getElementById("loai");
    var sizeOptions = document.getElementById("size");
    var mauOptions = document.getElementById("mau");
    if (category.value === "Đồ lưu niệm Mixi") {
        mauOptions.setAttribute("hidden", "");
        sizeOptions.setAttribute("hidden", "");
    } else {
        sizeOptions.removeAttribute("hidden");
        mauOptions.removeAttribute("hidden");
    }
}
window.ShowSP = function ($scope, $http, $location, $routeParams) {
    $scope.lst = [];
    $http.get("http://localhost:3000/sanpham").then(function (response) {
        $scope.lst = response.data;
    },
        function (error) {
            console.log("Error: " + error);
        }
    );

    $scope.trangthai = "NEW";
    $scope.add = function () {
        if ($scope.ten == null || $scope.giaban == null || $scope.mausac == null || $scope.size == null || $scope.theloai == null || isNaN($scope.giaban) || isNaN($scope.giamgia)) {
            alert("Vui lòng nhập đầy đủ thông tin và nhập đúng thông tin!");
            window.location.reload();
        }
        else if ($scope.ten.trim() === '' || $scope.mausac.trim() === '' || $scope.giaban.trim() === '') {
            alert("Không được nhập nhiều khoảng trắng như vậy");
            window.location.reload();
        }
        else {
            $scope.id = null;
            $http.post("http://localhost:3000/sanpham", {
                id: $scope.id,
                ten: $scope.ten,
                giaban: $scope.giaban,
                theloai: $scope.theloai,
                mausac: $scope.mausac,
                size: $scope.size,
                giamgia: $scope.giamgia,
                trangthai: $scope.trangthai
            }).then(function (response) {
                if (response.status === 201) {
                    alert("Thêm thành công ");
                    window.location.reload();
                }
            },
                function (error) {
                    console.log("Error: " + error);
                }
            );
        }

    };
    
    $scope.detail = function (id) {
        $http.get("http://localhost:3000/sanpham/" + id).then(function (response) {
            var sizeOptions = document.getElementById("size");
            var mauOptions = document.getElementById("mau");
            if (response.data.theloai === "Đồ lưu niệm Mixi") {
                $scope.id = response.data.id;
                $scope.ten = response.data.ten;
                $scope.giaban = response.data.giaban;
                $scope.theloai = response.data.theloai;
                $scope.mausac = response.data.mausac;
                $scope.size = response.data.size;
                $scope.giamgia = response.data.giamgia;
                $scope.trangthai = response.data.trangthai;
                sizeOptions.setAttribute("hidden","");
                mauOptions.setAttribute("hidden","");
            } else {
                $scope.id = response.data.id;
                $scope.ten = response.data.ten;
                $scope.giaban = response.data.giaban;
                $scope.theloai = response.data.theloai;
                $scope.mausac = response.data.mausac;
                $scope.size = response.data.size;
                $scope.giamgia = response.data.giamgia;
                $scope.trangthai = response.data.trangthai;
                sizeOptions.removeAttribute("hidden");
                mauOptions.removeAttribute("hidden");
            }

        },
            function (error) {
                console.log("Error: " + error);
            }
        );
    }

    $scope.update = function () {
        if ($scope.id == null) {
            alert("Vui lòng chọn sản phẩm cần sửa");
            window.location.reload();
        }
        else if ($scope.ten == null || $scope.giaban == null || $scope.size == null || $scope.mausac == null || $scope.theloai == null || isNaN($scope.giaban) || isNaN($scope.giamgia)) {
            alert("Vui lòng nhập đầy đủ thông tin và nhập đúng thông tin!");
            window.location.reload();
        }
        else if ($scope.ten.trim() === '' || $scope.mausac.trim() === '' || $scope.giaban.trim() === '') {
            alert("Không được nhập nhiều khoảng trắng như vậy");
            window.location.reload();
        }
        else {
            $http.put("http://localhost:3000/sanpham/" + $scope.id,
                {
                    id: $scope.id,
                    ten: $scope.ten,
                    giaban: $scope.giaban,
                    theloai: $scope.theloai,
                    mausac: $scope.mausac,
                    size: $scope.size,
                    giamgia: $scope.giamgia,
                    trangthai: $scope.trangthai
                }
            ).then(function (response) {
                if (response.status == 200) {
                    alert("Cập nhật thành công ");
                    window.location.reload();
                }

            });

        };

    };
    $scope.delete = function (id) {
        $http.delete("http://localhost:3000/sanpham/" + id).then(function (response) {
            if (response.status == 200) {
                alert("xóa thành công");
                window.location.reload();
            }
        },
            function (error) {
                console.log("Error: " + error);
            });
    };

    var id = $routeParams.id;
    $http.get("http://localhost:3000/sanpham/" + id).then(function(response) {
      $scope.ctsp = response.data;
    });
}

