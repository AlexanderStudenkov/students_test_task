jQuery(function($){

    $(document).on('click', '.create-student-button', function(){
				
			var create_student_html=`
			<div id='read-students' class='btn btn-primary pull-right m-b-15px read-students-button'>
				<span class='glyphicon glyphicon-list'></span> Все студенты
			</div>
			
			<form id='create-student-form' action='#' method='post' border='0'>
				<table class='table table-hover table-responsive table-bordered'>

					<tr>
						<td>ФИО</td>
						<td><input type='text' name='name' class='form-control' required /></td>
					</tr>

					<tr>
						<td>Курс</td>
						<td><input type='number' min='1' name='course' class='form-control' required /></td>
					</tr>
					
					<tr>
								
								
								<td></td>
								<!-- кнопка отправки формы -->
								<td>
									<button type='submit' class='btn btn-info'>
										<span class='glyphicon glyphicon-edit'></span> Добавить запись
									</button>
								</td>
					</tr>

				</table>
			</form>`;
			
			// вставка html в «page-content» нашего приложения 
			$("#page-content").html(create_student_html);

			// изменяем тайтл 
			changePageTitle("Добавление студента");
    });
	
	

	$(document).on('submit', '#create-student-form', function(){
		// получение данных формы 
		var form_data=JSON.stringify($(this).serializeObject());

		// отправка данных формы в API 
		$.ajax({
			url: "http://localhost/api/student/create.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				// продукт был создан, вернуться к списку продуктов 
				showStudents();
			},
			error: function(xhr, resp, text) {
				// вывести ошибку в консоль 
				console.log(xhr, resp, text);
			}
		});
		
		return false;
	});
	
});