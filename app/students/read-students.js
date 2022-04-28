jQuery(function($){

    showStudents();
	
	// при нажатии кнопки 
	$(document).on('click', '.read-students-button', function(){
		showStudents();
		
		// изменяем заголовок страницы 
		changePageTitle("Все студенты");
	});

});


function showStudents(){
	$.getJSON("http://localhost/api/student/read.php", function(data){
	var read_students_html=`
		<!-- при нажатии загружается форма создания продукта -->
		<div id='create-student' class='btn btn-primary pull-right m-b-15px create-student-button'>
			<span class='glyphicon glyphicon-plus'></span> Добавление студента
		</div>
		<!-- начало таблицы -->
		<table class='table table-bordered table-hover'>

			<!-- создание заголовков таблицы -->
			<tr>
				<th>ФИО</th>
				<th>Курс</th>
			</tr>`;

			// перебор списка возвращаемых данных 
			$.each(data.records, function(key, val) {

				// создание новой строки таблицы для каждой записи 
				read_students_html+=`
					<tr>

						<td>` + val.name + `</td>
						<td>` + val.course + `</td>

						<!-- кнопки 'действий' -->
						<td>
							
							<button class='btn btn-primary m-r-10px read-one-student-button' data-id='` + val.id + `'>
								<span class='glyphicon glyphicon-eye-open'></span> Просмотр
							</button>

							
							<button class='btn btn-info m-r-10px update-student-button' data-id='` + val.id + `'>
								<span class='glyphicon glyphicon-edit'></span> Редактирование
							</button>

							
							<button class='btn btn-danger delete-student-button' data-id='` + val.id + `'>
								<span class='glyphicon glyphicon-remove'></span> Удаление
							</button>
						</td>

					</tr>`;
			});



		// конец таблицы 
		read_students_html+=`</table>`;
		
		// вставка в 'page-content' нашего приложения 
		$("#page-content").html(read_students_html);


	});
}