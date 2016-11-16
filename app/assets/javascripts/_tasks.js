$(function() {
  //get all tasks and generate list
  $.get('/tasks').success(function(data){
    for (task in data) {
      $('.todo-list').append(
        $('<li>').append(
          $('<input>').attr({
            class: 'toggle',
            type: 'checkbox',
            'data-id': data[task].id,
            checked: data[task].done
          }).add($('<label>').append(data[task].title))
        )
      )
    };

    //update done status in db on checkbox toggle
    $('.toggle').change(function (){
      var task = $(this);
      var id = task.data("id");
      var doneStatus = task.prop('checked');
      $.ajax({
        url: '/tasks/' + id,
        method: 'PUT',
        data: {
          task: {
            done: doneStatus
          }
        },
        success: function(){
          var status = doneStatus ? "done" : "not done";
          console.log('marked task '+id+' as '+ status);
        }
      })
    });
  });

});
