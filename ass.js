window.ShowSP = function ($scope, $http, $location, $rootScope) {
    $scope.lstSP = [];
    $http.get("http://localhost:3000/sanpham").then(function (response) {
        $scope.lstSP = response.data;
    },
        function (error) {
            console.log("Error: " + error);
        }
    );

        $scope.trangthai = "NEW";
        $scope.add = function () {
        if ($scope.name == null || $scope.price == null || $scope.color == null || $scope.Size == null || $scope.type == null || isNaN($scope.price) || isNaN($scope.sale)) {
            alert("Vui lòng nhập đầy đủ thông tin và nhập đúng thông tin!");
            window.location.reload('/quantri');
        }
        else if ($scope.name.trim() === '' || $scope.color.trim() === '' || $scope.price.trim() === '') {
            alert("Không được nhập nhiều khoảng trắng như vậy");
            window.location.reload('/quantri');
        }
        else {
            $scope.id=null;
            $http.post("http://localhost:3000/sanpham", {
                id: $scope.id,
                name: $scope.name,
                price: $scope.price,
                type: $scope.type,
                color: $scope.color,
                Size: $scope.Size,
                Image: $scope.Image,
                sale: $scope.sale,
                trangthai: $scope.trangthai
            }).then(function (response) {
                if (response.status === 201) {
                    alert("Thêm thành công ");
                    window.location.reload('/quantri');
                }
            },
                function (error) {
                    console.log("Error: " + error);
                }
            );
        }

    };
    $scope.chitiet = function (id) {
        $http.get("http://localhost:3000/sanpham/" + id).then(function (response) {
            if (response.status === 200) {
                $scope.id = response.data.id;
                $scope.name = response.data.name;
                $scope.price = response.data.price;
                $scope.type = response.data.type;
                $scope.color = response.data.color;
                $scope.Size = response.data.Size;
                $scope.Image = response.data.Image;
                $scope.sale = response.data.sale;
                $scope.trangthai = response.data.trangthai;
            }
        },
            function (error) {
                console.log("Error: " + error);
            }
        );
    };
    $scope.update = function () {
        if ($scope.id == null) {
            alert("Vui lòng chọn sản phẩm cần sửa");
            window.location.reload('/quantri');
        }
        else if ($scope.name == null || $scope.price == null || $scope.Size == null || $scope.color == null || $scope.type == null || isNaN($scope.price) || isNaN($scope.sale)) {
            alert("Vui lòng nhập đầy đủ thông tin và nhập đúng thông tin!");
            window.location.reload('/quantri');
        }
        else if ($scope.name.trim() === '' || $scope.color.trim() === '' || $scope.price.trim() === '') {
            alert("Không được nhập nhiều khoảng trắng như vậy");
            window.location.reload('/quantri');
        }
        else {
            $http.put("http://localhost:3000/sanpham/" + $scope.id,
                {
                    id: $scope.id,
                    name: $scope.name,
                    price: $scope.price,
                    type: $scope.type,
                    color: $scope.color,
                    Image: $scope.Image,
                    Size: $scope.Size,
                    sale: $scope.sale,
                    trangthai: $scope.trangthai
                }
            ).then(function (response) {
                if (response.status == 200) {
                    alert("Cập nhật thành công ");
                    window.location.reload('/quantri');
                }

            });

        };

    };
    $scope.delete = function (id) {
        $http.delete("http://localhost:3000/sanpham/" + id).then(function (response) {
            if (response.status == 200) {
                alert("xóa thành công");
                window.location.reload('/quantri');
            }
        },
            function (error) {
                console.log("Error: " + error);
            });
    };
    $rootScope.product = {};
    $scope.getSanPham = function (id) {
        $http.get("http://localhost:3000/sanpham/" + id).then(function (response) {
            $rootScope.product = response.data;
        })
    }
    
}