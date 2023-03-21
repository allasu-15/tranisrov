$(function () {
    const settings = {
        formUrl: 'https://web-email-sender.groscloud.com/api/v2/prelands/make-lead',
        // formUrl: 'https:/web_email_sender.local/api/v2/prelands/make-lead',
        trackerUrl: 'dgbdhvqpwvplersqjytw.dunkansp.info',
        token: '3d69e0e709de8b82b9db982adbf9b007',
        companyKey: 'yj92syceeblxu8k8x0f0',
        user_id: '70'
    }
    const Api = {
        request(params = {}, callback = function (result) { console.log(result); }) {
            return $.ajax({
                type: "POST",
                processData: false,
                contentType: 'application/x-www-form-urlencoded',
                url: settings.formUrl,
                crossDomain: true,
                headers: {},
                success: response => callback(response),
                beforeSend: function (xhr, options) {
                    $('#preloader').show()
                },
                complete: function (xhr, options) {
                    $('#preloader').hide()
                },
                error: function (xhr, textStatus, error) {
                    let text = xhr.status + ' ' + error
                    console.log('error', text)
                },
                ...params
            });
        },
    }

    const trackerApi = {
        getClickId() {
            return $.post({
                url: settings.trackerUrl + '/get-click-id',
                crossDomain: true,
                data: { key: settings.companyKey },
                success: function (response) {
                    window.click_id = response.click_id ?? ''
                    console.log(window.click_id)
                },
                complete: function (xhr, options) {
                },
                error: function (xhr, textStatus, error) {
                    let text = xhr.status + ' ' + error
                    console.log('error', text)
                },
            });
        },
    }

    $('#mainForm').on('submit', function (event) {
        event.preventDefault();
        const data = new FormData(this)

        if (
            !iti.isValidNumber()
        ) {
            $('input[name="profile[phone]"]').css({ backgroundColor: "pink" })
            return
        }
        data.append('profile[password]', $.passGen({ 'length': 10, 'numeric': true, 'lowercase': true, 'uppercase': true, 'special': false }) + '1Qa')
        data.append('ip', window.ip)
        data.append('profile[user_agent]', window.navigator.userAgent)
        data.set('profile[phone]', iti.getNumber())
        data.append('token', settings.token)
        data.append('profile[geo]', window.country_code)
        data.append('country_code', window.country_code)
        data.append('tp_aff_sub', window.click_id)
        data.append('tp_aff_sub2', settings.user_id)
        data.append('tp_aff_sub5', settings.companyKey)
        Api.request({
            method: 'POST',
            data: new URLSearchParams(data)
        }, function (response) {
            console.log('success')
            $('.overlay').removeClass('hidden');
            close_icon_dark_container_selector.removeClass('hidden')
            body_html_selector.removeClass('scroll-active')
            body_html_selector.addClass('scroll-inactive')
            $('#call').addClass('call-container-focus')
            const url = response.auto_login_url ?? null
            console.log('RESPONSE_URL', url)
            if (url !== null) {
                window.location.href = url
            }
        })
    })

    $('input[name="next"]').click(function () {
        msf_btn_next()
    })
    trackerApi.getClickId()

})
