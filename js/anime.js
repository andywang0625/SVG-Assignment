var s = Snap("#paper");
var bt = Snap("#button");

var cir = s.select("#pla").attr({
    fill:'gray'
});

var star = s.select('#star').attr({
    fill:'yellow'
});

var flight_path = s.path("M146.45,8.26c-0.86-2.62-2.12-5.07-3.97-5.35c-9.18-1.36-36.61,49.97-24.78,90.78\
c10.98,37.9,49.84,46.14,45.39,60.52c-6.25,20.18-84.58,9.72-108.52,6.52c-39.77-5.31-46.16-12-48.26-17.48\
c-5.57-14.53,12.01-38.89,33.39-50.87c44.72-25.05,102.97,5.84,110.61-10.17c1.24-2.6-1.73-18.32-1.63-32.15").attr({'fill':'none', 'stroke':'none'});
var flight_length = Snap.path.getTotalLength(flight_path);

var star_path = star.node.getAttribute('d');
var rocket = s.select('#rocket')
var wings = s.select('#wings');
var rocket_path = rocket.node.getAttribute('d');
var farPla = new Snap.Matrix();
farPla.scale(0.4);
farPla.translate(0,160);
var nearPla = new Snap.Matrix();
nearPla.scale(1);
nearPla.translate(0,0);

var b1 = bt.select('#b1');
var b2 = bt.select('#b2');
var btn = bt.group(b1,b2);

function mouseover(){
    var buttonOver = new Snap.Matrix();
    buttonOver.scale(1.3);
    btn.animate({
        transform:'s1.3r0,'+(btn.cx)+','+(btn.cy)
    }, 300, mina.backin);
}
function mouseout(){
    var buttonOver = new Snap.Matrix();
    buttonOver.scale(1);
    btn.animate({
        transform:'s1r0,'+(btn.cx)+','+(btn.cy)
    }, 300, mina.backout);
}

function start(){
    star.animate({
        transform:nearPla,
        fill:'yellow'
    }, 500 ,mina.linear);
    cir.animate({
        stroke:'#FFFFFF',
        'strokeWidth':1,
        transform:farPla,
    },500, mina.linear);

    cir.animate({
        fill: 'white'
        }, 500, mina.linear);

    cir.animate({
        r: 3
    }, 500, mina.linear);

    cir.animate({
        cx:170
    },500, mina.linear,function(){
        cir.animate({
            cx:1
        }, 500);
        star.animate({
            fill:'red',
            d: rocket_path,
        }, 300, mina.linear,function(){
                var rockets = s.group(wings, star);
                rockets_box = rockets.getBBox();
                wings.animate({
                    fill:"blue"
                },100, mina.linear, function(){
                    Snap.animate(0, flight_length, function(step){
                        moveWithPath = Snap.path.getPointAtLength(flight_path, step);
                        x = moveWithPath.x - (rockets_box.width/2);
                        y = moveWithPath.y - (rockets_box.height/2);

                        //'translate('+x+','+y+')rotate('+(moveWithPath.alpha - 90)+','+star.cx+','+star.cy+')'
                        rockets.transform('translate('+ (x-120) + ',' + y + ')\
                                             rotate('+ (moveWithPath.alpha - 90)+', \
                                             '+rockets_box.cx+', '+rockets_box.cy+')');
                    }, 2022, mina.easeinout, function(){
                        star.animate({
                            d: star_path,
                            fill: "yellow",
                        },500, mina.linear,function(){
                            star.animate({
                                transform:'s0.7r0,'+(star.cx)+','+(star.cy)
                            },120,mina.linear,function(){
                                star.animate({
                                    transform:'s20r0,'+(star.cx)+','+(star.cy)
                                },500,mina.backin,function(){
                                    star.animate({
                                        fill:'black'
                                    }, 400, mina.backin,function(){
                                        document.getElementById("paper").style.visibility="hidden";
                                        document.getElementById("panel").style.visibility="hidden";
                                    });
                                });
                                star.animate({
                                    fill:'black'
                                },400, mina.backin);
                            });
                        },500, mina.linear);
                        wings.animate({
                            fill:"none"
                        });
                    });
                    cir.animate({
                        transform:nearPla,
                        fill:'grey',
                        'stroke':'none'
                    }, 1400, mina.linear);
                });
            });

    });
   }
