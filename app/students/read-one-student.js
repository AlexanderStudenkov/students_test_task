jQuery(function($){

    $(document).on('click', '.read-one-student-button', function(){
        var id = $(this).attr('data-id');
		
		$.getJSON("http://localhost/api/student/read_one.php?id=" + id, function(data){
			// начало html 
			var read_one_student_html=`
				<div id='read-students' class='btn btn-primary pull-right m-b-15px read-students-button'>
					<span class='glyphicon glyphicon-list'></span> Все студенты
				</div>
				
				<table class='table table-bordered table-hover'>

					<tr>
						<td class='w-30-pct'>ФИО</td>
						<td class='w-70-pct'>` + data.name + `</td>
					</tr>

					<tr>
						<td>Курс</td>
						<td>` + data.course + `</td>
					</tr>

				</table>`;
	
	
			$("#page-content").html(read_one_student_html);

			// изменяем заголовок страницы 
			changePageTitle("Просмотр студента");
	
		});

    });

});