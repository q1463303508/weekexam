$(function() {
    $.ajax({
        url: '/api/product',
        dataType: 'json',
        success: function(res) {
            console.log(res)
            if (res.code === 1) {
                var str = '';
                res.data.product.forEach(function(file) {
                    str += `<li>${file.title}</li>`
                })
            }
        },
        error: function(error) {
            console.warn(error)
        }
    })
})