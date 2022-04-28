jQuery(function($){

    
    $(document).on('click', '.update-student-button', function(){
		
		var id = $(this).attr('data-id');
		
		$.getJSON("http://localhost/api/student/read_one.php?id=" + id, function(data){

			// значения будут использоваться для заполнения нашей формы 
			var name = data.name;
			var course = data.course;

			var update_student_html=`
					<div id='read-students' class='btn btn-primary pull-right m-b-15px read-students-button'>
						<span class='glyphicon glyphicon-list'></span> Все студенты
					</div>

					
					<!-- мы используем свойство 'required' html5 для предотвращения пустых полей -->
					<form id='update-student-form' action='#' method='post' border='0'>
						<table class='table table-hover table-responsive table-bordered'>

							<tr>
								<td>ФИО</td>
								<td><input value=\"` + name + `\" type='text' name='name' class='form-control' required /></td>
							</tr>

							<tr>
								<td>Курс</td>
								<td><input value=\"` + course + `\" type='number' min='1' name='course' class='form-control' required /></td>
							</tr>

							<tr>
								<!-- скрытый «идентификатор продукта», чтобы определить, какую запись удалить -->
								<td><input value=\"` + id + `\" name='id' type='hidden' /></td>

								<!-- кнопка отправки формы -->
								<td>
									<button type='submit' class='btn btn-info'>
										<span class='glyphicon glyphicon-edit'></span> Обновить запись
									</button>
								</td>
							</tr>

						</table>
					</form>
				`;

				// добавим в «page-content» нашего приложения 
				$("#page-content").html(update_student_html);

				// изменим title страницы 
				changePageTitle("Обновление записи");			
			
 
		});


    });

    
	$(document).on('submit', '#update-student-form', function(){

		// получаем данные формы 
		var form_data=JSON.stringify($(this).serializeObject());

		// отправка данных формы в API 
		$.ajax({
			url: "http://localhost/api/student/update.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// продукт был создан, возврат к списку продуктов 
				showStudents();
			},
			error: function(xhr, resp, text) {
				// вывод ошибки в консоль 
				console.log(xhr, resp, text);
			}
		});

		return false;
	});


});