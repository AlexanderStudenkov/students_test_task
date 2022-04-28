jQuery(function($){

    // будет работать, если была нажата кнопка удаления 
    $(document).on('click', '.delete-student-button', function(){
        
        var student_id = $(this).attr('data-id');
		
		// bootbox для подтверждения во всплывающем окне 
		bootbox.confirm({

			message: "<h4>Вы уверены?</h4>",
			buttons: {
				confirm: {
					label: '<span class="glyphicon glyphicon-ok"></span> Да',
					className: 'btn-danger'
				},
				cancel: {
					label: '<span class="glyphicon glyphicon-remove"></span> Нет',
					className: 'btn-primary'
				}
			},
			callback: function (result) {
				if (result==true) {
					// отправим запрос на удаление в API / удаленный сервер 
					$.ajax({
						url: "http://localhost/api/student/delete.php",
						type : "POST",
						dataType : 'json',
						data : JSON.stringify({ id: student_id }),
						success : function(result) {
							
							showStudents();
						},
						error: function(xhr, resp, text) {
							console.log(xhr, resp, text);
						}
					});

				}
			}
		});
	
    });
	



});