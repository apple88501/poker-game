//26張鋪克牌=各個數字拿一對
var fix_suits=['0','1','2','3']//0=黑桃,1=紅心,2=方塊,3=梅花
var arr=[];
var activeCard=[];
var solveCard=0;

$(function(){
    $("#start").click(gameBuilder);
})
function fuck(){
    alert("fuck")
}

function gameBuilder() {
    $("#content_section").html("");
    arr.length=0;
    activeCard.length=0;
    solveCard=0;

    var fix_num1 = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    var fix_num2 = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

    for (let i = 0; i < 13; i++) {
        let firstSuit = getRandomInt(4);
        fix_num1[i] = fix_suits[firstSuit] + fix_num1[i];
        let secondSuit = firstSuit;
        while (secondSuit === firstSuit) {
            secondSuit = getRandomInt(4);
        }
        fix_num2[i] = fix_suits[secondSuit] + fix_num2[i];
    }

    arr = fix_num1.concat(fix_num2);

    arr.sort(function () {
        return (0.5 - Math.random());
    })

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    arr.forEach(function (item,index) {
        var str = "<div class=\"poker_card card_back\"\n id='" + index +
            "'>    </div>";
        $("#content_section").append(str);
    });
    $(".poker_card").click(insertRealValue);
}

function insertRealValue(){
    $(this).off("click");
    $(this).removeClass("card_back");
    $(this).addClass("card_front");
    if(activeCard.length===2){
        var dom1=$(".poker_card[id='" + activeCard[0] + "'] ").children().first()[0];
        var dom2=$(".poker_card[id='" + activeCard[1] + "'] ").children().first()[0];
        if($(dom1).data("value")!==$(dom2).data("value")) {
            activeCard.forEach(function (openedCard) {
                $(".poker_card[id='" + openedCard + "']").html("");
                $(".poker_card[id='" + openedCard + "']").click(insertRealValue);
                $(".poker_card[id='" + openedCard + "']").addClass("card_back");
                $(".poker_card[id='" + openedCard + "']").removeClass("card_front");
            });
        }
        activeCard.length=0;
    }
    var item = arr[parseInt($(this).prop("id"))];

    activeCard.push($(this).prop("id"));

    var real = '<span class="suit ';
    var suit = item.charAt(0);

    if (suit === '0') {
        real += 'black">♠';
    } else if (suit === '1') {
        real += 'red">♥';
    } else if (suit === '2') {
        real += 'red">♦';
    } else if (suit === '3') {
        real += 'black">♣';
    }
    real += '</span>';
    real += item.substring(1);

    var str = "  <span class=\"suit_left_top\" data-value='"+item.substring(1)+"'>" + real + "</span>\n" +
        "        <span class=\"number_mid\">:)</span>\n" +
        "        <span class=\"suit_right_bottom\">" + real + "</span>\n";
    $(this).html(str);


    if(activeCard.length===2){
        var dom1=$(".poker_card[id='" + activeCard[0] + "'] ").children().first()[0];
        var dom2=$(".poker_card[id='" + activeCard[1] + "'] ").children().first()[0];
        if($(dom1).data("value")===$(dom2).data("value")){
            activeCard.forEach(function (openedCard) {
                $(".poker_card[id='" + openedCard + "']").off("click");
            });
            solveCard+=2;
        }
        if(solveCard>=26){
            alert("你贏了！");
        }
    }
}