

  // function post() {
  //   let comment = $('#textarea-post').val();
  //   console.log(comment);
  //   let today = new Date().toISOString();
  //   $.ajax({
  //     type: 'POST',
  //     url: "/posting",
  //     data: {
  //       comment_give: comment,
  //       date_give: today
  //     },
  //     success: function (response) {
  //       $('#modal-post').removeClass("is-active")
  //       window.location.reload()
  //     }
  //   })
  // }

  // function get_posts(username) {
  //   if(username === undefined){
  //     username = '';
  //   }
  //   $('#post-box').empty();
  //   $.ajax({
  //     type: 'GET',
  //     url: `/get_posts?username_give=${username}`,
  //     data: {},
  //     success: function (response) {
  //       if (response['result'] === 'success') {
  //         let posts = response['posts'];
  //         for (let i = 0; i < posts.length; i++) {
  //           let post = posts[i];
  //           let time_post = new Date(post['date'])
  //           let time_before = time2str(time_post);
  //           let class_heart = post['heart_by_me'] ? 'fa-heart': 'fa-heart-o';
  //           let class_star = post['star_by_me'] ? 'fa-star': 'fa-star-o';
  //           let class_thumbsup = post['thumbsup_by_me'] ? 'fa-thumbs': 'fa-thumbs-o-up';


  //           let html_temp =
  //             `
  //           <div class="box" id="${post['_id']}">
  //     <article class="media">
  //       <div class="media-left">
  //         <a href="/user/${post['username']}" class="image is-64x64">
  //           <img src="/static/${post['profile_pic_real']}" alt="Image" class="is-rounded">
  //         </a>
  //       </div>
  //       <div class="media-content">
  //         <div class="content">
  //           <p>
  //             <strong>${post['profile_name']}</strong>
  //             <small>@${post['username']}</small>
  //             <small>${time_before}</small>
  //             <br>
  //             ${post['comment']}
  //           </p>
  //         </div>
  //         <nav class="level is-mobile">
  //           <div class="level-left">
  //             <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like('${post['_id']}','heart')">
  //               <span class="icon is-small">
  //                 <i class="fa ${class_heart}" area-hidden="true"></i>
  //               </span>&nbsp;
  //               <span class="like-num">${num2str(post['count_heart'])}</span>
  //             </a>

  //             <a class="level-item is-sparta" aria-label="star" onclick="toggle_star('${post['_id']}','star')">
  //               <span class="icon is-small">
  //                 <i class="fa ${class_star}" area-hidden="true"></i>
  //               </span>&nbsp;
  //               <span class="like-num">${num2str(post['count_star'])}</span>
  //             </a>

  //             <a class="level-item is-sparta" aria-label="thumbsup" onclick="toggle_thumbsup('${post['_id']}','thumbsup')">
  //               <span class="icon is-small">
  //                 <i class="fa ${class_thumbsup}" area-hidden="true"></i>
  //               </span>&nbsp;
  //               <span class="like-num">${num2str(post['count_thumbsup'])}</span>
  //             </a>
  //           </div>
  //         </nav>
  //       </div>
  //     </article>
  //   </div>
  //           `;

  //           $('#post-box').append(html_temp)
  //         }
  //       }
  //     }
  //   })
  // }

  // function time2str(date) {
  //   let today = new Date();
  //   let time = (today - date) / 1000 / 60;
  //   if (time < 1) {

  //     return 'Just now';
  //   }

  //   if (time < 60) {

  //     return parseInt(time) + ' minutes ago';
  //   }

  //   time = time / 60;
  //   if (time < 24) {
  //     return parseInt(time) + ' hours ago'
  //   }
  //   time = time / 24;
  //   if(time < 7){

  //     return parseInt(time) + ' days ago'
  //   }

  //   let year = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   let day = date.getDate();
  //   return `${year}.${month}.${day}`;
  // }

  // function toggle_like(post_id, type){
  //   let $a_like =  $(`#${post_id} a[aria-label='heart']`)
  //   let $i_like = $a_like.find('i');
  //   if ($i_like.hasClass('fa-heart')){
  //     $.ajax({
  //       type: 'POST',
  //       url:'/update_like',
  //       data:{
  //         post_id_give:post_id,
  //         type_give:type,
  //         action_give: 'unlike'
  //       },
  //       success: function(response){
  //         $i_like.addClass('fa-heart-o').removeClass('fa-heart');
  //         $a_like.find('span.like-num').text(num2str(response['count']))
  //       }
  //     })
  //   }else{
  //     $.ajax({
  //       type: 'POST',
  //       url:'/update_like',
  //       data:{
  //         post_id_give:post_id,
  //         type_give:type,
  //         action_give: 'like'
  //       },
  //       success: function(response){
  //         $i_like.addClass('fa-heart').removeClass('fa-heart-o');
  //         $a_like.find('span.like-num').text(response['count'])
  //       }
  //     })
  //   }
  // }

  // function toggle_star(post_id, type){
  //   let $a_like =  $(`#${post_id} a[aria-label='star']`)
  //   let $i_like = $a_like.find('i');
  //   if ($i_like.hasClass('fa-star')){
  //     $.ajax({
  //       type: 'POST',
  //       url:'/update_like',
  //       data:{
  //         post_id_give:post_id,
  //         type_give:type,
  //         action_give: 'unlike'
  //       },
  //       success: function(response){
  //         $i_like.addClass('fa-star-o').removeClass('fa-star');
  //         $a_like.find('span.like-num').text(num2str(response['count']))
  //       }
  //     })
  //   }else{
  //     $.ajax({
  //       type: 'POST',
  //       url:'/update_like',
  //       data:{
  //         post_id_give:post_id,
  //         type_give:type,
  //         action_give: 'like'
  //       },
  //       success: function(response){
  //         $i_like.addClass('fa-star').removeClass('fa-star-o');
  //         $a_like.find('span.like-num').text(response['count'])
  //       }
  //     })
  //   }
  // }

  // function toggle_thumbsup(post_id, type){
  //   let $a_like =  $(`#${post_id} a[aria-label='thumbsup']`)
  //   let $i_like = $a_like.find('i');
  //   if ($i_like.hasClass('fa-thumbs-up')){
  //     $.ajax({
  //       type: 'POST',
  //       url:'/update_like',
  //       data:{
  //         post_id_give:post_id,
  //         type_give:type,
  //         action_give: 'unlike'
  //       },
  //       success: function(response){
  //         $i_like.addClass('fa-thumbs-o-up').removeClass('fa-thumbs-up');
  //         $a_like.find('span.like-num').text(num2str(response['count']))
  //       }
  //     })
  //   }else{
  //     $.ajax({
  //       type: 'POST',
  //       url:'/update_like',
  //       data:{
  //         post_id_give:post_id,
  //         type_give:type,
  //         action_give: 'like'
  //       },
  //       success: function(response){
  //         $i_like.addClass('fa-thumbs-up').removeClass('fa-thumbs-o-up');
  //         $a_like.find('span.like-num').text(response['count'])
  //       }
  //     })
  //   }
  // }

  // function num2str(count){
  //   if(count > 1000000){
  //     return parseInt(count / 1000000) + 'm';
  //   }

  //   if(count > 100){
  //     return parseInt(count/100) / 10 + 'k'
  //   }

  //   if(count == 0){
  //     return '';
  //   }

  //   return count
  // }

/**
 * * Chatbot
 * 
 * 
 */
let name_profile = profile_name,
userId = user_username,
myRoomJson;

  $('.roomTitle').text(name_profile)
  $('#roomNameInput').val(userId)
  $('.copyLinker2').text(userId)


$("textarea").keydown(function(e){
    // Enter was pressed without shift key
    if (e.key == 'Enter' && !e.shiftKey)
    {
        sendT();
        e.preventDefault();
    }
});

$("#send").click(sendT);

function sendT(){
    if($('.message').last().data("number") == userId){
        //showErrors('tips', 'Tips', 'Press Ctrl + Shift to make a new line!');
        $('.message .messArea').last().append('<div class="textM '+userId+' newMmess">'+$('#message').val()+'</div>')
        let goup = setTimeout(function(){
            $('.message .messArea .textM').last().removeClass('newMmess');
        }, 10);
        $('#message').val('')
        goToBottom();
      findText()
    }
}

document.onload = goToBottom();

let chatStatus = 1;
$('.chatArea').on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() < $(this)[0].scrollHeight - $('.message').last().innerHeight() ) {
        newGoD()
    }
})

findText()

function findText(){
    let message = document.querySelectorAll('.textM'),
    i ;
    for(i = 0; i < message.length; i++){
        message[i].innerHTML = linkify(message[i].textContent);
    }
}
let iaeou = 0;
$("#settings").click(clickSetTrans);
function clickSetTrans(){
    if(iaeou == 0){
        $('.settingsBar').addClass('clickSettingsBar')
        $('.changeW').addClass('clickSettingsCont')
        $('#settings').addClass('clickSettings');
        iaeou = 1;
    }else{
        $('.settingsBar').removeClass('clickSettingsBar')
        $('.changeW').removeClass('clickSettingsCont')
        $('#settings').removeClass('clickSettings');
        iaeou = 0;
    }
}

function linkify(text) {
    let urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="blank">' + url + "</a>";
    });
}

$("#message").on("input", function() {
    let textarea = document.querySelector("#message")
    enteredText = textarea.value;
    numberOfLineBreaks = (enteredText.match(/\n/g)||[]).length;
    characterCount = enteredText.length + numberOfLineBreaks;
    rowcount = numberOfLineBreaks + 1;
    if(rowcount < 4){
    $("#message").attr('rows', rowcount)
    }
});

function newGoD(){
    $("#goToDown").removeClass('downDowny')
}

$("#groupEdit").click(changeTitle);
$("#titleFirst").click(changeTitle);

function changeTitle(){
    let input = $('#roomNameInput'),
    regExp = /[a-zA-Z]/g;
    input.attr('style', 'display:block;')
    input.select();
    input.focusout(function(){
        if(input.val().trim().length > 5 && regExp.test(input.val().trim())){
        $('.roomTitle').text(input.val())
        input.attr('style', 'display:none;')
        }else{
            showErrors('Invalid Name', 'In making your Room Name, you must enter 5 or more LETTERS.');
            input.val($('.roomTitle')[0].innerHTML);
            console.log('Room title must be over 5 LETTERS.')
            input.attr('style', 'display:none;')
        }
    })
    input.keydown(function(e){
        // Enter was pressed without shift key
        if (e.key == 'Enter' && !e.shiftKey){
        if(input.val().trim().length > 5 && regExp.test(input.val().trim())){
            $('.roomTitle').text(input.val())
                input.attr('style', 'display:none;')
                e.preventDefault();
            }else{
                input.val($('.roomTitle')[0].innerHTML);
                showErrors('error', 'Invalid Name', 'In making your Room Name, you must enter 5 or more LETTERS.');
                console.log('Room title must be over 5 LETTERS.')
                input.attr('style', 'display:none;')
            }
        }
    });
}

function showErrors(type, title, details){
    if(type == 'error'){
    $('.errorsSide').append('<div class="bubble" id="errorBubble"><h1 class="erStatus"> <span class="material-icons">error</span>'+ title +'</h1><p class="erDetails">'+ details+'</p></div>');
    }
    if(type == 'tips'){
    $('.errorsSide').append('<div class="bubble" id="tipsBubble"><h1 class="erStatus"> <span class="material-icons">tips_and_updates</span>'+ title +'</h1><p class="erDetails">'+ details+'</p></div>');
    }
    $('.bubble').attr('style', 'display:block;');

    let start = setTimeout(function(){
        $('.bubble').addClass('bubbleAfter');
    }, 100);
    let end = setTimeout(function(){
        $('.bubble').first().removeClass('bubbleAfter');
        $('.bubble').first().addClass('bubbleGone');
    }, 5000);
    let deleteEl = setTimeout(function(){
        $('.bubble').first().remove();
    }, 5700)
}

$("#goToDown").click(function(){
    goToBottom();
})

function goToBottom(){
    $("#goToDown").addClass('downDowny');
    $('.chatArea').scrollTop($('.chatArea')[0].scrollHeight);
}

$("#linkCopy").click(function(){
    let timer = setTimeout(function(){
        $(".shareLink").addClass('showItem');
        $(".blackout").addClass('blackShow');
    }, 120);
    let timer2 = setTimeout(function(){
        $(".shareLink").attr('style', 'display: block');
        $(".blackout").attr('style', 'display: block');

    }, 100);

    $(".blackout").click(function(){
            $(".shareLink").removeClass('showItem');
            $(".blackout").removeClass('blackShow');
        let timer2 = setTimeout(function(){
            $(".shareLink").attr('style', 'display: none');
            $(".blackout").attr('style', 'display: none');
    
        }, 400);
    }
    )
    $("#copyLinker").click(function(){
        let dummy = document.querySelector("#copyvalue");
        dummy.select();
        document.execCommand("copy");
    })
})
