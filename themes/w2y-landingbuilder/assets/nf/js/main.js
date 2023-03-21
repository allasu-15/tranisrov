/*
history.pushState(null, null, window.location.href);

window.addEventListener('popstate', function () 
{
    history.pushState(null, null, window.location.href);
});
*/

var header_trading_trading_selector = $('.header-trading');
var top_alert_trading_selector = $('.top-alert-trading');
var trades_container_selector = $('.trades-container');
var close_icon_container_selector = $('.close-icon-container');
var close_icon_dark_container_selector = $('.close-icon-dark-container');
var up_slide_container_selector = $('.up-slide-container');
var header_loaded_selector = $('.header-loaded');
var slide_container_selector = $('#slide-container');
var step_1_selector = $('#step-1');
var step_2_selector = $('#step-2');
var step_3_selector = $('#step-3');
var body_html_selector = $('body, html');
var input_selector = $('input');
var email_input_selector = $('#email-input');
var countrycode_input_selector = $('#countrycode-input');
var phone_input_selector = $('#phone-input');
var firstname_input_selector = $('#firstname-input');
var lastname_input_selector = $('#lastname-input');
var s1_input_selector = $('#s1-input');
var s2_input_selector = $('#s2-input');
var s3_input_selector = $('#s3-input');
var s4_input_selector = $('#s4-input');
var signup_flow_step_1_selector = $('#signup-flow-step-1');
var start_trading_btn_selector = $('#start-trading-btn');
var balance_amount_selector = $('.balance-amount');
var dot_control_selector = $('.dot-control');
var dots_container_selector = $('.dots-container');
var header_title_1_selector = $('.header-title-1');
var header_title_2_selector = $('.header-title-2');
var header_title_3_selector = $('.header-title-3');
var signup_flow_step_selector = $('.signup-flow-step');
var back_arrow_selector = $('.back-arrow');
var signup_flow_button_selector = $('#signup-flow-button');
var deposit_page_container_selector = $('.deposit-page-container');
var signup_flow_container_selector = $('.signup-flow-container');
var header_shadow_selector = $('.header-shadow');
var data_toggle_tooltip_selector = $('[data-toggle="tooltip"]');
var video_selector = $('video');
var init_countdown = 299;
var promo_iframe_delay = 2000;

var window_width = $(window).width();
var window_height = $(window).height();
var trading_active = 0;
var signup_flow_step = 0;
var all_error = 0;
var spacer_trading_height = header_trading_trading_selector.height()*1 + 21;
var new_trade_id = 1;

var show_countdown = 0;

countdown(init_countdown);

setTimeout(function() {
	$('#promo-iframe').addClass('faded-in');
}, promo_iframe_delay);

//balance_amount_selector.countTo();

$('.console').click(function() {
	videoPauseReset('video0');
});

/*
$('#action-item-activate').click(function() {
	slide_container_selector.scrollTop(0);
	scrollToElement($('#step-1'), $('#slide-container'), $('.header-loaded'), 2.5);
});

$('#action-item-deposit').click(function() {
	slide_container_selector.scrollTop(0);
	scrollToElement($('#step-2'), $('#slide-container'), $('.header-loaded'), 2.5);
});

$('#action-item-trading').click(function() {
	slide_container_selector.scrollTop(0);
	scrollToElement($('#step-3'), $('#slide-container'), $('.header-loaded'), 2.5);
});
*/

function scrollToElement(element_selector, toscroll_selector, header_selector, header_factor) {
	toscroll_selector.animate(
	{
		scrollTop: (element_selector.offset().top - header_selector.height()*header_factor)
	},
		800 //speed
	);
}


function formatNumber(num, format) 
{
	if(format == 'x,xxx.xx') 
	{
		//return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, ",")
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	if(format == 'x.xxx,xx')
	{
		//return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, ".")
		value_1 = num.toString().replace(/[.]/, ',');
		return value_1.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}
}

function countdown(seconds) {

	minutes = Math.floor(seconds / 60);
	seconds_out = seconds - minutes * 60; 

	if(seconds_out < 10)
	{
		seconds_out = '0' + seconds_out;
	}

	if(minutes < 10)
	{
		minutes = '0' + minutes;
	}

	$('.countdown-mm').html(minutes);
	$('.countdown-ss').html(seconds_out);

	seconds--;
	
	if(seconds >= 0)
	{
		setTimeout(function() {
			countdown(seconds);
		}, 1000);
	}
	else
	{
		countdown(init_countdown);
	}
}

function signupSlideShow() {

	setTimeout(function() {
		$('#account-loading-bar').addClass('loading-3');
	}, 0);
	
	setTimeout(function() {
		slide_container_selector.addClass('slide-container-active');
		body_html_selector.addClass('scroll-inactive');
	}, (200/2));
	
	setTimeout(function() {
		slide_container_selector.addClass('border-none');
		body_html_selector.scrollTop(0);
		slide_container_selector.scrollTop(0);
	}, (700/2));

	setTimeout(function() {
		$('#promo-slide-1').addClass('promo-slide-in');
	}, (0/2));

	setTimeout(function() {
		$('#promo-slide-1').addClass('promo-slide-out');
	}, (6200/2));

	setTimeout(function() {
		$('#promo-slide-2').addClass('promo-slide-in');
	}, (6200/2));

	setTimeout(function() {
		$('#promo-slide-2').addClass('promo-slide-out');
	}, (10700/2));

	setTimeout(function() {
		$('#account-slide').addClass('promo-slide-in');
	}, (11200/2));

	setTimeout(function() {
		$('#top-alert-loading').addClass('top-alert-loaded');
		$('#header-loading').addClass('header-loaded');
		close_icon_dark_container_selector.addClass('close-icon-dark-up');
		close_icon_dark_container_selector.removeClass('close-icon-dark-down');
	}, (11200/2));

	setTimeout(function() {
		slide_container_selector.addClass('scroll-active');
	}, (11700/2));

}

function validateEmail(email_input) 
{
	var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!pattern.test(email_input))
		return false
	else
		return true
}

function validatePhone(phone_input) 
{
	var pattern = /^[0-9\s]*$/;
	if(!pattern.test(phone_input) || phone_input == '' || phone_input.length < 6)
		return false
	else
		return true
}

function validateFirstLast(firstname_input, lastname_input)
{
	if(firstname_input != '' && lastname_input != '')
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*
function videoPause(video_id) {
		$('#'+video_id).get(0).pause();
}

function videoPlay(video_id) {
		$('#'+video_id).get(0).play();
}


function videoPauseReset(video_id) {
		$('#'+video_id).get(0).pause();
		$('#'+video_id).get(0).currentTime = 0;
}

function setVideo(video_id) {
	if(		$(window).scrollTop() <= ($('#'+video_id).offset().top - $(window).height())
		|| 	$(window).scrollTop() >= ($('#'+video_id).offset().top + $('#'+video_id).height())
		)
	{
		videoPauseReset(video_id);
	}

	if(		$(window).scrollTop() >= ($('#'+video_id).offset().top - $(window).height())
		&&	$(window).scrollTop() <= ($('#'+video_id).offset().top + $('#'+video_id).height())
		)
	{
		videoPlay(video_id);
	}
}
*/

function promoCaption() {
	
	setTimeout(function() {
		header_title_1_selector.addClass('fade-in');
	}, 0);
	
	setTimeout(function() {
		header_title_1_selector.addClass('fade-out');
		header_title_1_selector.removeClass('fade-in');
	}, 3500);
	
	setTimeout(function() {
		header_title_2_selector.addClass('fade-in');
	}, 5000);
	
	setTimeout(function() {
		header_title_2_selector.addClass('fade-out');
		header_title_2_selector.removeClass('fade-in');
	}, 8500);
	
	setTimeout(function() {
		header_title_3_selector.addClass('fade-in');
	}, 10000);
	
	setTimeout(function() {
		header_title_3_selector.addClass('fade-out');
		header_title_3_selector.removeClass('fade-in');
	}, 13500);
	
	setTimeout(function() {
		header_title_1_selector.removeClass('fade-out');
		header_title_2_selector.removeClass('fade-out');
		header_title_3_selector.removeClass('fade-out');
		promoCaption();
	}, 15000);

}

//var spacer_height = $('.top-alert').height()*1 + $('.header').height()*1;
//var spacer_main_height = $('.top-alert').height()*0 + $('#header-1').height()*1 + 20;

$(document).ready(function() {

	//$('.demo-iframe').attr('src', 'index.php?trading=1&demo=1');

	//$('.promo').css('margin-top', spacer_main_height+'px');

	setTimeout(function() {
		if(false)
		//if(show_countdown == 1)
		{
			$('#main-container .top-alert').addClass('top-alert-down');
			header_shadow_selector.addClass('header-shadow-down');			
		}
	}, 0);

	promoCaption();

	/*
	for(i=0 ; i<($('.autoplay-video').length) ; i++) 
	{
		setVideo('video'+i);
	}
	*/
	

});

/*
$(document).scroll(function() {
	for(i=0 ; i<($('.autoplay-video').length) ; i++) 
	{
		setVideo('video'+i);
	}
});
*/

/*
$(window).scroll(function() {
	$('#scroll-position').text($(window).scrollTop());
	$('#video0-position').text(($('#video0').offset().top - $(window).height()));
	$('#video0-position2').text(($('#video0').offset().top + $('#video0').height()));
	$('#video1-position').text(($('#video1').offset().top - $(window).height()));
	$('#video1-position2').text(($('#video1').offset().top + $('#video1').height()));
	
	if(		$(window).scrollTop() <= ($('#video0').offset().top - $(window).height())
		|| 	$(window).scrollTop() >= ($('#video0').offset().top + $('#video0').height())
		)
	{
		videoPauseReset('video0');
	}

	if(		$(window).scrollTop() >= ($('#video0').offset().top - $(window).height())
		&&	$(window).scrollTop() <= ($('#video0').offset().top + $('#video0').height())
		)
	{
		videoPlay('video0');
	}
	
	if(		$(window).scrollTop() <= ($('#video1').offset().top - $(window).height())
		|| 	$(window).scrollTop() >= ($('#video1').offset().top + $('#video1').height())
		)
	{
		videoPauseReset('video1');
	}

	if(		$(window).scrollTop() >= ($('#video1').offset().top - $(window).height())
		&&	$(window).scrollTop() <= ($('#video1').offset().top + $('#video1').height())
		)
	{
		videoPlay('video1');
	}
});
*/

$('.signup-btn').click(function() {

	scrollToElement($('#signup-form-1'), body_html_selector, $('.j-block'), header_factor_countdown);
	
	setTimeout(function() {
		email_input_selector.focus();
	}, 500);
});

$('.overlay, .close-icon-dark-container').click(function() {
	$('.overlay').addClass('hidden');
	close_icon_dark_container_selector.addClass('hidden');
	body_html_selector.addClass('scroll-active');
	body_html_selector.removeClass('scroll-inactive');
	signup_flow_container_selector.removeClass('signup-flow-container-focus');
	signup_flow_container_selector.parent().css('padding-top', 0);
});

$('.signup2-btn').click(function() {
	$('.overlay').removeClass('hidden');
	close_icon_dark_container_selector.removeClass('hidden');
	body_html_selector.removeClass('scroll-active');
	body_html_selector.addClass('scroll-inactive');
	signup_flow_container_selector.parent().css('padding-top', $('.signup-flow-container').height()+40);
	signup_flow_container_selector.addClass('signup-flow-container-focus');
	email_input_selector.focus();
});

$('.deposit-btn').click(function() {
	close_icon_container_selector.removeClass('close-icon-up');
	close_icon_container_selector.addClass('close-icon-down');
	up_slide_container_selector.removeClass('slide-down');
	up_slide_container_selector.addClass('slide-up');
	deposit_page_container_selector.removeClass('hidden');
	slide_container_selector.removeClass('scroll-active');
	slide_container_selector.addClass('scroll-inactive');
});

$('.demo-btn').click(function() {
	close_icon_container_selector.removeClass('close-icon-up');
	close_icon_container_selector.addClass('close-icon-down');
	up_slide_container_selector.removeClass('slide-down');
	up_slide_container_selector.addClass('slide-up');
	$('.demo-container').removeClass('hidden');
	slide_container_selector.removeClass('scroll-active');
	slide_container_selector.addClass('scroll-inactive');
});

$('#header-loading').click(function() {
	close_icon_container_selector.addClass('close-icon-up');
	close_icon_container_selector.removeClass('close-icon-down');
	up_slide_container_selector.removeClass('slide-up');
	up_slide_container_selector.addClass('slide-down');
	slide_container_selector.addClass('scroll-active');
	slide_container_selector.removeClass('scroll-inactive');
	setTimeout(function() {
		deposit_page_container_selector.addClass('hidden');
		$('.demo-container').addClass('hidden');
	}, 500);
});

/*
video_selector.click(function() {
	if($(this).prop('muted'))
	{
		video_selector.prop('muted', true);
		$('.volume-control').children('i').removeClass('bi-volume-up-fill');
		$('.volume-control').children('i').addClass('bi-volume-mute-fill');
		$(this).prop('muted', false);
		$(this).parent('.video-container').children('.volume-control').children('i').addClass('bi-volume-up-fill');
		$(this).parent('.video-container').children('.volume-control').children('i').removeClass('bi-volume-mute-fill');
	}
	else
	{
		video_selector.prop('muted', true);
		$('.volume-control').children('i').removeClass('bi-volume-up-fill');
		$('.volume-control').children('i').addClass('bi-volume-mute-fill');
	}
});
*/

$('.video-container').click(function() {
	if($(this).children('video').attr('data-playing') == '0')
	{
		$(this).children('video').attr('data-playing', '1');
		$(this).children('video').get(0).play();
		$(this).children('.play-control').children('i').addClass('bi-pause-fill');
		$(this).children('.play-control').children('i').removeClass('bi-play-fill');
		$(this).children('.play-control').addClass('playing');
		$(this).children('.play-control').removeClass('paused');
	}
	else
	{
		video_selector.attr('data-playing', '0');
		$(this).children('video').get(0).pause();
		$('.play-control').children('i').removeClass('bi-pause-fill');
		$('.play-control').children('i').addClass('bi-play-fill');
		$('.play-control').removeClass('playing');
		$('.play-control').addClass('paused');
	}
});


input_selector.on('click, blur, focus, keyup', function() {
	data_toggle_tooltip_selector.tooltip('hide');
	$(this).removeClass('is-invalid');
});


$('#signup-form-1 .signup-flow-back').click(function() {	

	if(signup_flow_step == 1)
	{
		back_arrow_selector.addClass('hidden');
	}
	else
	{
		back_arrow_selector.removeClass('hidden');
	}
	
	if(signup_flow_step > 0)
	{
		signup_flow_step = signup_flow_step - 1;
		signup_flow_step_selector.addClass('hidden');
		$('#signup-flow-step-' + signup_flow_step).removeClass('hidden');
		dot_control_selector.removeClass('dot-active');
		$('#dot-step-' + signup_flow_step).addClass('dot-active');
		dots_container_selector.removeClass('hidden');
	}
});


email_input_selector.on('keyup', function() {
	$('#dot-step-0').addClass('dot-active');
});

email_input_selector.blur(function() {
	if(
		email_input_selector.val() == '' &&
		firstname_input_selector.val() == '' &&
		lastname_input_selector.val() == '' &&
		phone_input_selector.val() == ''
		
		)
	{
		$('#dot-step-0').removeClass('dot-active');
	}
});


signup_flow_button_selector.click(function() {

	if(signup_flow_step == 2)
	{
		if(validatePhone(phone_input_selector.val()))
		{
			//$(this).addClass('hidden');
			//signup_flow_step_selector.addClass('hidden');
			back_arrow_selector.addClass('hidden');
			dot_control_selector.removeClass('dot-active');
			$('.signup-flow-loading').removeClass('hidden');
			data_toggle_tooltip_selector.tooltip('hide');
		}
		else
		{
			phone_input_selector.focus();
			phone_input_selector.addClass('is-invalid');
			phone_input_selector.tooltip('show');
		}
	}

	if(signup_flow_step == 1)
	{
		if(validateFirstLast(firstname_input_selector.val(), lastname_input_selector.val()))
		{
			data_toggle_tooltip_selector.tooltip('hide');
			$(this).prop('disabled', true);
			signup_flow_step = signup_flow_step + 1;
			signup_flow_step_selector.addClass('hidden');
			$('#signup-flow-step-' + signup_flow_step).removeClass('hidden');
			dot_control_selector.removeClass('dot-active');
			$('#dot-step-' + signup_flow_step).addClass('dot-active');
			firstname_input_selector.focus();
			dots_container_selector.removeClass('hidden');
			back_arrow_selector.removeClass('hidden');
			phone_input_selector.focus();
			setTimeout(function() {
				signup_flow_button_selector.prop('disabled', false);
			}, 500);

			if(all_error == 1)
			{
				phone_input_selector.tooltip('show');				
			}
			signup_flow_button_selector.prop('type', 'submit');
		}
		else
		{
			signup_flow_step_1_selector.tooltip('show');
		}
	}

	if(signup_flow_step == 0)
	{
		if(validateEmail(email_input_selector.val()))
		{
			data_toggle_tooltip_selector.tooltip('hide');
			$(this).prop('disabled', true);
			signup_flow_step = signup_flow_step + 1;
			signup_flow_step_selector.addClass('hidden');
			$('#signup-flow-step-' + signup_flow_step).removeClass('hidden');
			dot_control_selector.removeClass('dot-active');
			$('#dot-step-' + signup_flow_step).addClass('dot-active');
			firstname_input_selector.focus();
			dots_container_selector.removeClass('hidden');
			back_arrow_selector.removeClass('hidden');
			setTimeout(function() {
				signup_flow_button_selector.prop('disabled', false);
			}, 500);

			if(all_error == 1)
			{
				signup_flow_step_1_selector.tooltip('show');				
			}
		}
		else
		{
			email_input_selector.focus();
			email_input_selector.addClass('is-invalid');
			email_input_selector.tooltip('show');
		}
	}

	if(signup_flow_step == 2)
	{
		$('#firstname-text').html(firstname_input_selector.val());
		$('#lastname-text').html(lastname_input_selector.val());
	}
});




/* START TRADING */
function tradeChartMoving() {

	$('.trade-chart-moving').css('left', '-=1');

	setTimeout(function() {
		tradeChartMoving();
	}, 1000);
}

function initAutoTrading() {
	start_trading_btn_selector.prop('checked', true);
	trading_active = 1;
	top_alert_trading_selector.addClass('top-alert-trading-in');
	top_alert_trading_selector.removeClass('top-alert-trading-out');
	header_trading_trading_selector.addClass('header-trading-down');
	header_trading_trading_selector.removeClass('header-trading-up');
	trades_container_selector.addClass('trades-container-down');
	trades_container_selector.removeClass('trades-container-up');

	setTimeout(function() {
		$('#promo-loading-bar').addClass('loading-3');
	}, 0);
}

start_trading_btn_selector.click(function() {

	if(trading_active == 0)
	{
		trading_active = 1;
		top_alert_trading_selector.addClass('top-alert-trading-in');
		top_alert_trading_selector.removeClass('top-alert-trading-out');
		header_trading_trading_selector.addClass('header-trading-down');
		header_trading_trading_selector.removeClass('header-trading-up');
		trades_container_selector.addClass('trades-container-down');
		trades_container_selector.removeClass('trades-container-up');
		
		setTimeout(function() {
			autoTrading();
		}, 2000);
	}
	else
	{
		trading_active = 0;
		top_alert_trading_selector.addClass('top-alert-trading-out');
		top_alert_trading_selector.removeClass('top-alert-trading-in');
		header_trading_trading_selector.addClass('header-trading-up');
		header_trading_trading_selector.removeClass('header-trading-down');
		trades_container_selector.addClass('trades-container-up');
		trades_container_selector.removeClass('trades-container-down');
	}
});

function autoTrading() {

	newTrade(new_trade_id);
	new_trade_id++;

	if(trading_active == 1)
	{
		setTimeout(function() {
			autoTrading();
		}, Math.floor((Math.random() * new_trade_max) + new_trade_min));
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function newTrade(trade_id) {
	var cur = ["ChainLink/USD","Ethereum/JPY","ChainLink/NZD","Ripple/AUD","Ripple/GBP","ChainLink/CHF","Ethereum/NZD","BTC Cash/JPY","Stellar/AUD","Stellar/CAD","BTC Cash/USD","Litecoin/USD","Yota/CHF","Litecoin/NZD","Yota/NZD","Bitcoin/EUR","Ethereum/USD","Bitcoin/GBP","ChainLink/EUR","Bitcoin/AUD","ChainLink/GBP","Ethereum/CHF","Yota/CAD","Ripple/CAD","Bitcoin/USD","Ethereum/GBP","BTC Cash/CHF","Bitcoin/NZD","Cardano/CHF","Yota/JPY","BTC Cash/NZD","ChainLink/AUD","Ripple/NZD","ChainLink/CAD","Cardano/JPY","Stellar/EUR","Litecoin/AUD","Stellar/USD","Ripple/USD","Ethereum/CAD","Bitcoin/CAD","Ripple/JPY","Stellar/NZD","Litecoin/CHF","Ethereum/EUR","Bitcoin/CHF","ChainLink/JPY","BTC Cash/AUD","Cardano/AUD","Cardano/CAD","Ripple/CHF","Stellar/GBP"];
	trade_invest_value = $('#trade-invest').val();

	result = '<div class="trade-container" id="'+trade_id+'"><div class="trade "><div class="clearfix"><div class="trade-col-1"><div class="trade-loading"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div><div class="blue-check-mark hidden"><i class="bi bi-check"></i></div></div><div class="trade-col-2"><div class="trade-name">'+cur[getRandomInt(51)]+'</div><div class="trade-price trade-pos"><span class="currency-symbol">$</span><span class="trade-amount" data-value="0">0.00</span><span class="currency-symbol"></span></div></div><div class="trade-col-3"><div class="trade-chart-container"><div class="trade-chart trade-chart-moving clearfix" style="left: -'+getRandomInt(800)+'px;"></div></div></div><div class="trade-col-4"><div class="arrow-right">&rsaquo;</div></div></div></div></div>'

	trades_container_selector.prepend(result);


	setTimeout(function() {
		$('#' + trade_id).addClass('new-trade');
	}, init_trade);
	
	setTimeout(function() {
		$('#' + trade_id + ' .trade').addClass('trade-in');
	}, (init_trade + 500));

	tradeTicker(trade_id, 0, Math.floor((Math.random() * rpt_max) + rpt_min), trade_invest_value);
}

function tradeTicker(trade_id, j, rpt, trade_invest) {

	multiplicator = $('#trade-multiplicator').val();
	random_factor = (Math.floor((Math.random() * (trade_invest*10)) + (trade_invest*20)) * multiplicator/100 / 100);
	plus_minus_factor = Math.floor(Math.random() * 100) + 1;
	
	if(plus_minus_factor > pm_edge)
	{
		new_trade_amount = ($('#' + trade_id + ' .trade-amount').attr('data-value')*1 + random_factor).toFixed(2);
	}
	else
	{
		new_trade_amount = ($('#' + trade_id + ' .trade-amount').attr('data-value')*1 - random_factor).toFixed(2);
	}
	
	if(new_trade_amount < 0)
	{
		$('#' + trade_id + ' .trade-amount').parent().addClass('trade-neg');
		$('#' + trade_id + ' .trade-amount').parent().removeClass('trade-pos');
	}
	else
	{
		$('#' + trade_id + ' .trade-amount').parent().addClass('trade-pos');
		$('#' + trade_id + ' .trade-amount').parent().removeClass('trade-neg');
	}

	$('#' + trade_id + ' .trade-amount').attr('data-value', new_trade_amount);
	$('#' + trade_id + ' .trade-amount').html(formatNumber(new_trade_amount, number_format));

	if(j < rpt)
	{
		setTimeout(function() {
			tradeTicker(trade_id, j, rpt, trade_invest);
		}, Math.floor((Math.random() * 1000) + 2000));
		j++;
	}
	else
	{	
		new_trade_amount = parseFloat(new_trade_amount);

		if(new_trade_amount < 0)
		{
			new_profit = parseFloat(balance_amount_selector.attr('data-value')).toFixed(2) * 1 - new_trade_amount.toFixed(2) * (-1);
		}
		else
		{
			new_profit = parseFloat(balance_amount_selector.attr('data-value')).toFixed(2) * 1 + new_trade_amount.toFixed(2) * 1;
		}

		new_profit = parseFloat(new_profit).toFixed(2);

		balance_amount_selector.attr('data-value', new_profit);
		balance_amount_selector.html(formatNumber(new_profit, number_format));
		$('#' + trade_id + ' .trade-amount').parent().parent().parent().children('.trade-col-1').children('.trade-loading').addClass('hidden');
		$('#' + trade_id + ' .trade-amount').parent().parent().parent().children('.trade-col-1').children('.blue-check-mark').removeClass('hidden');
	}
}
/* END TRADING */