//Select Image
jQuery(document).on("click", ".gt3_select_image_from_media", function (event) {
    var gt3_select_image_from_media_this = jQuery(this);
    event.preventDefault();

    var gt3_file_frame = wp.media.frames.file_frame = wp.media({
        title: 'Select Images',
        button: {
            text: 'Select'
        },
        multiple: false,
        library: {
            type: 'image'
        }
    });

    gt3_file_frame.on('select', function () {
        var gt3_image_attachment = gt3_file_frame.state().get('selection').first().toJSON();
        gt3_select_image_from_media_this.prev().val(gt3_image_attachment.id);
        gt3_select_image_from_media_this.next().next().find("img").remove();
        gt3_select_image_from_media_this.next().next().html("<img src='"+gt3_image_attachment.url+"' alt=''>");
    });

    gt3_file_frame.open();
});

//Remove Image
jQuery(document).on("click", ".gt3_image_from_media_remove", function (event) {
    jQuery(this).prev().prev().val("");
    jQuery(this).next().find("img").fadeOut();
});


// Popup
function gt3_show_admin_pop(gt3_message_text, gt3_message_type) {
	// Success - gt3_message_type = 'info_message'
	// Error - gt3_message_type = 'error_message'
	jQuery(".gt3_result_message").remove();
	jQuery("body").removeClass('active_message_popup').addClass('active_message_popup');
	jQuery("body").append("<div class='gt3_result_message "+gt3_message_type+"'>"+gt3_message_text+"</div>");
	var messagetimer = setTimeout(function(){
		jQuery(".gt3_result_message").fadeOut();
		jQuery("body").removeClass('active_message_popup');
		clearTimeout(messagetimer);
	}, 3000);
}

function gt3_reactivate_sortable() {
    jQuery('.sections').sortable({placeholder: 'ui-state-highlight-sections', handle: '.some-element.move'});
    jQuery('.feature-list').sortable({placeholder: 'ui-state-highlight-sections', handle: '.some-element2.move'});
    jQuery('.sortable_icons_list').sortable();
}

function gt3_getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gt3_color_picker() {
	if (jQuery('.color_option_admin').size() > 0 || jQuery('.cpicker').size() > 0) {
		jQuery(".cpicker").wpColorPicker();
	} 
}

function gt3_waiting_state_start() {
    jQuery(".waiting-bg").show();
}

function gt3_waiting_state_end() {
    jQuery(".waiting-bg").hide();
}

/* AUTO HEIGHT FOR POPUP */
function gt3_popupAutoH() {
    nowWinH = jQuery(window).height();
    popupH = nowWinH - 150;
    jQuery(".pop_scrollable_area").height(popupH);
}

//Document Ready
jQuery(document).ready(function () {
	/* Radio Toggle Button */
    jQuery(document).on('click', '.radio_toggle_cont .radio_toggle_mirage', function () {
        var this_click_btn = jQuery(this);
        var radio_toggle_cont = this_click_btn.parents(".radio_toggle_cont");

        if (this_click_btn.hasClass("checked")) {
            this_click_btn.stop().animate({backgroundPosition:'100% 0%'}, {duration:'fast'});
            this_click_btn.removeClass("checked").addClass("not_checked");
            radio_toggle_cont.find('.yes_state').removeAttr("checked");
            radio_toggle_cont.find('.no_state').attr("checked", "checked");
        } else {

            /* only one accordion can be expanded */
            this_click_btn.parents('.edit_popup').find('.accordion_expanded_toggle').find('.radio_toggle_mirage').each(function (index) {
                if (jQuery(this).not(".checked")) {
                    var radio_toggle_cont2 = jQuery(this).parents(".radio_toggle_cont");
                    jQuery(this).stop().animate({backgroundPosition:'100% 0%'}, {duration:'fast'});
                    jQuery(this).removeClass("checked").addClass("not_checked");
                    radio_toggle_cont2.find('.yes_state').removeAttr("checked");
                    radio_toggle_cont2.find('.no_state').attr("checked", "checked");
                }
            });

            this_click_btn.stop().animate({backgroundPosition:'0% 0%'}, {duration:'fast'});
            this_click_btn.removeClass("not_checked").addClass("checked");
            radio_toggle_cont.find('.no_state').removeAttr("checked");
            radio_toggle_cont.find('.yes_state').attr("checked", "checked");
        }
    });
	
	/* Packery Layout Selector */
	jQuery(".gt3_packery_ls_cont_builder").each(function () {
		jQuery(this).find(".checked").removeClass('checked');
		var cur_val = jQuery(this).find('.gt3_packery_ls_value').val();
		if (cur_val == '') {
			jQuery(this).find(".gt3_packery_ls_item:first").addClass("checked");
			jQuery('.gt3_packery_ls_value').val('pls_3items');
		} else {
			jQuery(this).find('.'+cur_val).addClass('checked');
		}
	});
	
	/* GALLERY TYPE SELECT */
	if (jQuery('.select_gallery_type').size() > 0) {
		var cur_val = jQuery('.select_gallery_type').val();
		jQuery('.gallery_type_settings').hide();
		jQuery('.gallery_type_'+cur_val).show();
	}
	
	/* POST FORMATS */
	var nowpostformat = jQuery('#post-formats-select input:checked').val();
	var nowNEWpostformat = jQuery('.post-format-options a.active').attr("data-wp-format");

	if (nowpostformat == 'quote' || nowNEWpostformat == 'quote') {
		jQuery('#quote_sectionid_inner').show();
		jQuery('.wp-admin.post-type-post #pb_section').show();
	}
	if (nowpostformat == 'link' || nowNEWpostformat == 'link') {
		jQuery('#link_sectionid_inner').show();
		jQuery('.wp-admin.post-type-post #pb_section').show();
	}
	if (nowpostformat == 'image' || nowNEWpostformat == 'image') {
		jQuery('#portslides_sectionid_inner').show();
		jQuery('.wp-admin.post-type-post #pb_section').show();
	}
	if (nowpostformat == 'video') {
		jQuery('#video_sectionid_inner').show();
		jQuery('.wp-admin.post-type-post #pb_section').show();
	}
	if (nowpostformat == 'audio') {
		jQuery('#audio_sectionid_inner').show();
		jQuery('.wp-admin.post-type-post #pb_section').show();
	}
	if (nowpostformat == '0' || nowNEWpostformat == 'standard') {
		jQuery('#default_sectionid_inner').show();
		jQuery('.wp-admin.post-type-post #pb_section').show();
	}

	/* ON CHANGE */
	/* WP <=3.5 */
	jQuery('#post-formats-select input').on('click', function () {
		jQuery('#quote_sectionid_inner, #link_sectionid_inner, #portslides_sectionid_inner, #audio_sectionid_inner, #video_sectionid_inner, #default_sectionid_inner').hide();
		var nowclickformat = jQuery(this).val();
		if (nowclickformat == 'image') {
			jQuery('#portslides_sectionid_inner').show();
			jQuery('.wp-admin.post-type-post #pb_section').show();
		}
		if (nowclickformat == 'video') {
			jQuery('#video_sectionid_inner').show();
			jQuery('.wp-admin.post-type-post #pb_section').show();
		}
		if (nowclickformat == 'quote') {
			jQuery('#quote_sectionid_inner').show();
			jQuery('.wp-admin.post-type-post #pb_section').show();
		}
		if (nowclickformat == 'link') {
			jQuery('#link_sectionid_inner').show();
			jQuery('.wp-admin.post-type-post #pb_section').show();
		}

		if (nowclickformat == 'audio') {
			jQuery('#audio_sectionid_inner').show();
			jQuery('.wp-admin.post-type-post #pb_section').show();
		}
		if (nowclickformat == '0') {
			jQuery('#default_sectionid_inner').show();
			jQuery('.wp-admin.post-type-post #pb_section').show();
		}
	});
	/* WP >=3.6 */
	jQuery('.post-format-options a').on('click', function () {
		jQuery('#portslides_sectionid_inner, #audio_sectionid_inner, #video_sectionid_inner, #default_sectionid_inner').hide();
		var nowclickformat = jQuery(this).attr("data-wp-format");
		if (nowclickformat == 'image') {
			jQuery('#portslides_sectionid_inner').show();
		}
		if (nowclickformat == 'standard') {
			jQuery('#default_sectionid_inner').show();
		}
	});
		
	check_visual_part_for_toggles();
    //Submit Admin Settings
    jQuery(".admin_page_settings").submit(function (event) {
        event.preventDefault();
        var admin_page_settings = jQuery(this);
        jQuery.post(gt3_admin_ajax_url, {
            action: 'gt3_save_admin_options',
            serialize_string: JSON.stringify(admin_page_settings.serializeArray())
        }, function (response) {
            var gt3_saved_response = JSON.parse(response);
			gt3_show_admin_pop('<b>DONE! You\'ve successfully saved the changes.</b>', 'info_message');
        });
    });

    jQuery(".admin_reset_settings").on("click", function() {
        var agree = confirm("Are you sure?");
        if (!agree) {return false;}
        jQuery.post(ajaxurl, { action:'gt3_reset_admin_settings' }, function(response) {
            window.location.reload();
        });
        return false;
    });

    //Work With Menu
    var admin_l_mix_tabs_item = jQuery('.admin_l-mix-tabs-item');
    admin_l_mix_tabs_item.on("click", function () {
        admin_l_mix_tabs_item.removeClass('active');
        jQuery('.admin_mix-tab').hide();

        var data_tabname = jQuery(this).find('.admin_l-mix-tab-title').attr('data-tabname');

        jQuery(this).addClass('active');
        jQuery('.' + data_tabname).show();
        jQuery('#form-tab-id').val(data_tabname);

        return false;
    });

    //Hide and Show Tabs
    jQuery('.admin_l-mix-tabs-list li').first().addClass('active');
    jQuery('.admin_mix-tabs .admin_mix-tab').first().show();


    //Autoopen Tab In Admin Panel
    var admin_tab_now_open = jQuery('#form-tab-id').val();
    if (admin_tab_now_open !== "") {
        admin_l_mix_tabs_item.removeClass('active');
        jQuery('#' + admin_tab_now_open).addClass('active');
        jQuery('.admin_mix-tab').hide();
        jQuery('.' + admin_tab_now_open).show();
    }

    /* Sidebar Manager */
    jQuery(document).on('click', '.admin_create_new_sidebar_btn', function () {
        var sidebar_name = jQuery(this).parents('.add_new_sidebar').find('.admin_create_new_sidebar').val();
        if (sidebar_name == "") {
            alert("Sidebar must be named");
            return false;
        }
        jQuery(this).parents('.admin_mix-tab-control').find('.admin_sidebars_list').append('<div class="admin_sidebar_item"><input type="hidden" name="theme_sidebars[]" value="' + sidebar_name + '"><span class="admin_sidebar_name admin_visual_style1">' + sidebar_name + '</span><input type="button" class="admin_delete_this_sidebar admin_img_button cross" name="delete_this_sidebar" value="X"></div>');
        jQuery(this).parents('.add_new_sidebar').find('.create_new_sidebar').val("");
    });
    jQuery(document).on('click', '.admin_delete_this_sidebar', function () {
        var agree = confirm("Are you sure?");
        if (!agree)
            return false;
        jQuery(this).parents('.admin_sidebar_item').remove();
    });

    jQuery('.gt3_export_admin_settings').on("click", function(){
        jQuery.post(gt3_admin_ajax_url, {
            action: 'gt3_export_admin_options'
        }, function (response) {
            jQuery('.exp_response').html(response);
        });
    });

    jQuery(document).on('click', 'input[name=gt3_categories]:first', function () {
        if (jQuery(this).attr('checked')) {
            jQuery(this).parents('.edit_form_line').find('input').removeAttr('checked');
        }
        jQuery(this).attr('checked', 'checked');
    });
    jQuery(document).on('click', 'input[name=gt3_categories]:not(:first)', function () {
        jQuery(this).parents('.edit_form_line').find('input:first').removeAttr('checked');
    });

    gt3_color_picker();
	
	/* Page Settings */
	if (jQuery('.sortable_icons_list').size() > 0) {
        gt3_reactivate_sortable();
	}
	
	jQuery(document).on("click", ".social_list_for_select i", function () {
        var clicked_icon = jQuery(this).attr("data-icon-code");
        var rnd_team = gt3_getRandomInt(1000, 9999);
        jQuery(this).parents(".hright").find(".added_icons").append("<div class='stand_iconsweet new_added ui-state-default' style='display:none'><span class='stand_icon-container'><i class='stand_icon " + clicked_icon + "'></i></span><input type='hidden' name='pagebuilder[page_settings][icons][" + clicked_icon + rnd_team + "][data-icon-code]' value='" + clicked_icon + "'><input type='text' class='icon_name' name='pagebuilder[page_settings][icons][" + clicked_icon + rnd_team + "][name]' value='' placeholder='Give some name'><input type='text' class='icon_link' name='pagebuilder[page_settings][icons][" + clicked_icon + rnd_team + "][link]' value='' placeholder='Give some link'><input class='cpicker' type='text' name='pagebuilder[page_settings][icons][" + clicked_icon + rnd_team + "][fcolor]' value='#525359' placeholder='Foreground color'><span class='remove_me'><i class='stand_icon fa fa-remove'></i></span></div>");
        jQuery('.new_added').slideDown(300).removeClass('new_added');
        gt3_reactivate_sortable();
        gt3_color_picker();
    });

    jQuery(document).on("click", ".social_list_for_select2 i", function () {
        var clicked_icon = jQuery(this).attr("data-icon-code");
        var rnd_team = gt3_getRandomInt(1000, 9999);
        jQuery(this).parents(".hright").find(".added_icons").append("<div class='stand_iconsweet new_added ui-state-default' style='display:none'><span class='stand_icon-container'><i class='stand_icon " + clicked_icon + "'></i></span><input type='hidden' name='pagebuilder[page_settings][icons][" + clicked_icon + rnd_team + "][data-icon-code]' value='" + clicked_icon + "'><input type='text' class='icon_name' name='pagebuilder[page_settings][icons][" + clicked_icon + rnd_team + "][name]' value='' placeholder='Give some name'><input type='text' class='icon_link' name='pagebuilder[page_settings][icons][" + clicked_icon + rnd_team + "][link]' value='' placeholder='Give some link'><span class='remove_me'><i class='stand_icon fa fa-remove'></i></span></div>");
        jQuery('.new_added').slideDown(300).removeClass('new_added');
        gt3_reactivate_sortable();
        gt3_color_picker();
    });

    /*Create any icons for modules*/
    jQuery(document).on("click", ".all_available_font_icons_for_any_icons i.stand_icon", function () {
        var clicked_icon = jQuery(this).attr("data-icon-code");
        var any_icons_settingname = jQuery(this).parents(".all_available_font_icons_for_any_icons_cont").find(".any_icons_settingname").val();
        var any_icons_moduleid = jQuery(this).parents(".all_available_font_icons_for_any_icons_cont").find(".any_icons_moduleid").val();
        var rnd_any_icon = gt3_getRandomInt(1000, 9999);

        jQuery(this).parents(".all_available_font_icons_for_any_icons_cont").find(".already_added_icons").append("<div class='stand_iconsweet new_added ui-state-default' style='display:none'><span class='stand_icon-container'><i class='stand_icon " + clicked_icon + "'></i></span><input type='hidden' name='pagebuilder[modules][" + any_icons_moduleid + "][" + any_icons_settingname + "][" + clicked_icon + rnd_any_icon + "][data-icon-code]' value='" + clicked_icon + "'><input type='text' class='icon_name textoption type1' name='pagebuilder[modules][" + any_icons_moduleid + "][" + any_icons_settingname + "][" + clicked_icon + rnd_any_icon + "][name]' value='' placeholder='Give some name'><input type='text' class='icon_link textoption type1' name='pagebuilder[modules][" + any_icons_moduleid + "][" + any_icons_settingname + "][" + clicked_icon + rnd_any_icon + "][link]' value='' placeholder='Give some link'><input class='cpicker textoption type1' type='text' name='pagebuilder[modules][" + any_icons_moduleid + "][" + any_icons_settingname + "][" + clicked_icon + rnd_any_icon + "][fcolor]' value='#525359' placeholder='Foreground color'><span class='remove_me'><i class='remove_any_icons fa fa-remove'></i></span></div>");

        jQuery('.new_added').slideDown(300).removeClass('new_added');
        gt3_reactivate_sortable();
        gt3_color_picker();
    });
	
	jQuery(document).on("click", ".remove_me", function () {
        jQuery(this).parents(".added_icons .stand_iconsweet").slideUp(300, function () {
            jQuery(this).remove();
        });
    });
	
	/* ADD IMAGE TO AVAILABLE MEDIA */
    jQuery('.add_image_to_sliders_available_media').on("click", function(){
        if (jQuery(this).hasClass('for_post_fomrats')) {
            work_with_type = "post_formats";
        } else {
            work_with_type = "draggable_with_buttons";
        }
        var add_image_to_sliders_available_media_parent = jQuery(this);
        /*var settings_type = add_image_to_sliders_available_media_parent.find('.settings_type').val();*/

        var file_frame = wp.media.frames.file_frame = wp.media({
            title: 'Select Images',
            button: {
                text: 'Select',
            },
            multiple: true,
            library: {
                type: 'image'
            }
        });

        var itemsIDs = [];

        file_frame.on('select', function () {
            file_frame.state().get('selection').forEach(function(item, i, arr){
                itemsIDs[itemsIDs.length] = item.id;
            });

            gt3_waiting_state_start();

            if (work_with_type == "post_formats") {
                var data = {
                    action: 'gt3_generate_inserted_media_to_slider',
                    type: 'v2',
                    settings_type: 'fullscreen',
                    itemsIDs: itemsIDs.join(',')
                }
            } else {
                var data = {
                    action: 'gt3_generate_inserted_media_to_slider',
                    type: 'v1',
                    settings_type: 'fullscreen',
                    itemsIDs: itemsIDs.join(',')
                }
            }

            jQuery.post(ajaxurl, data, function (response) {

                if (work_with_type == "post_formats") {
                    add_image_to_sliders_available_media_parent.parents('.post-formats-container').find(".selected-images-for-pf").prepend(response);
                } else {
                    add_image_to_sliders_available_media_parent.parents('.bg_or_slider_option').find(".selected_media .append_block .sortable-img-items").prepend(response);
                }

                jQuery('.img-item.append_animation').fadeIn('fast');
                setTimeout("jQuery('.img-item.append_animation').removeClass('append_animation')", 200);
                gt3_waiting_state_end();
            });
        });

        file_frame.open();
    });
	
	/* ADD IMAGE FOR POST FORMAT */
    jQuery(document).on('click', '.available-images-for-pf .ajax_cont .img-item', function () {
        //jQuery(this).removeClass("available_media_item").clone().appendTo(".selected-images-for-pf");
        var pffullurl = jQuery(this).find(".previmg").attr("data-full-url");
        var pfattach_id = jQuery(this).find(".previmg").attr("data-attach-id");
        var previewurl = jQuery(this).find(".previmg").attr("src");

        var data = {
            action: 'get_unused_id_ajax'
        };

        gt3_waiting_state_start();

        jQuery.post(ajaxurl, data, function (response) {
            jQuery(".selected-images-for-pf").append("<div class='img-item append_animation style_small'><div class='img-preview'><img src='" + previewurl + "' data-full-url='" + pffullurl + "' data-thumb-url='" + previewurl + "' alt='' class='previmg'><div class='hover-container'></div></div><input type='hidden' name='pagebuilder[post-formats][images][" + response + "][attach_id]' value='" + pfattach_id + "'></div>");

            jQuery('.img-item.append_animation').fadeIn('fast');
            setTimeout("jQuery('.img-item.append_animation').removeClass('append_animation')", 200);
            gt3_waiting_state_end();
        });

    });
	
	/* add video in slider */
    jQuery(document).on('click', '.slider_type .add_video_slider', function () {
        var available_media_item_this_url = jQuery(this).find('.previmg').attr('data-full-url');
        var parent_root = jQuery(this).parents('.bg_or_slider_option');
        var settings_type = jQuery(this).parents('.bg_or_slider_option').find('.settings_type').val();

        var data = {
            action: 'get_unused_id_ajax'
        };

        gt3_waiting_state_start();

        jQuery.post(ajaxurl, data, function (response) {
            parent_root.find(".selected_media .append_block .sortable-img-items").prepend('<li><div class="video-item img-item item-with-settings append_animation"><input type="hidden" name="pagebuilder[sliders][' + settings_type + '][slides][' + response + '][src]" value=""><input type="hidden" name="pagebuilder[sliders][' + settings_type + '][slides][' + response + '][slide_type]" value="video"><div class="img-preview"><img src="' + available_media_item_this_url + '" alt=""><div class="hover-container"><div class="inter_x"></div><div class="inter_drag"></div><div class="inter_edit"></div></div></div><div class="edit_popup"><h2>Video settings</h2><span class="edit_popup_close"></span><div class="this-option"><div class="padding-cont"><h4>Video URL (Vimeo or YouTube)</h4><input name="pagebuilder[sliders][' + settings_type + '][slides][' + response + '][src]" type="text" value="" class="textoption type1"><div class="example">Examples:<br>Youtube - http://www.youtube.com/watch?v=YW8p8JO2hQw<br>Vimeo - http://vimeo.com/47989207</div></div><div class="padding-cont" style="padding-top:0;"><div class="fl w9" style="width:601px;"><h4>Thumbnail</h4></div><div class="right_block fl w1" style="width:115px;"><h4>color</h4><div class="color_picker_block"><span class="sharp">#</span><input type="text" value="" name="pagebuilder[sliders][' + settings_type + '][slides][' + response + '][title][color]" maxlength="25" class="medium cpicker textoption type1"><input type="text" value="" class="textoption type1 cpicker_preview" disabled="disabled"></div></div><div class="preview_img_video_cont"><div class="select_image_root"><input type="hidden" name="pagebuilder[sliders][' + settings_type + '][slides][' + response + '][attach_id]" value="" class="select_img_attachid"><div class="select_img_preview"></div><input type="button" class="button button-secondary button-large select_attach_id_from_media_library" value="Select"></div></div><div class="clear"></div></div><div class="hr_double"></div><div class="padding-cont"><div class="fl w9" style="width:601px;"></div><div class="right_block fl w1" style="width:115px;"><h4>color</h4><div class="color_picker_block"><span class="sharp">#</span><input type="text" value="" name="pagebuilder[sliders][' + settings_type + '][slides][' + response + '][caption][color]" maxlength="25" class="medium cpicker textoption type1"><input type="text" value="" class="textoption type1 cpicker_preview" disabled="disabled"></div></div><div class="clear"></div></div></div><div class="hr_double"></div><div class="padding-cont"><input type="button" value="Done" class="done-btn green-btn" name="ignore_this_button"><div class="clear"></div></div></div></div></li>');
            //reactivate_ajax_image_upload();
            jQuery('.img-item.append_animation').fadeIn('fast');
            setTimeout("jQuery('.img-item.append_animation').removeClass('append_animation')", 200);
            gt3_waiting_state_end();
        });
    });

    /* DELETE IMAGE FOR POST FORMAT */
    jQuery(document).on('click', '.selected-images-for-pf .img-item', function () {
        jQuery(this).fadeOut('fast');
        var tmpthis = jQuery(this);
        setTimeout(function () {
            tmpthis.remove();
        }, 1000);
    });

    gt3_popupAutoH();
	
	jQuery(document).on('click', '.available_media_arrow', function () {
        if (jQuery(this).hasClass("left_arrow")) {
            show_img_media_library_page = show_img_media_library_page - 1;
        }
        if (jQuery(this).hasClass("right_arrow")) {
            show_img_media_library_page = show_img_media_library_page + 1;
        }

        if (show_img_media_library_page < 1) {
            show_img_media_library_page = 1;
        }

        jQuery.post(ajaxurl, {
            action: 'gt3pb_get_media_for_postid',
            post_id: post_id,
            page: show_img_media_library_page
        }, function (data) {
            if (data !== "no_items") {
                jQuery('.available_media .ajax_cont').html(data);
            } else {
                show_img_media_library_page = show_img_media_library_page - 1;
            }
        }, 'text');
    });	
	
	jQuery(document).on('click', '.add_new_port_skills', function () {
        var skill_rand = gt3_getRandomInt(0, 99999);
        jQuery(this).parents(".port_skills_cont").find(".all_added_skills").append("<li class='stand_iconsweet ui-state-default new_added' style='display:none'> <input type='text' class='itt_type1 ww10 select_icon_and_insert_here' name='pagebuilder[page_settings][portfolio][skills][" + skill_rand + "][icon]' placeholder='Icon' value=''> <input type='text' class='itt_type1 ww43 select_client_name_and_insert_here' name='pagebuilder[page_settings][portfolio][skills][" + skill_rand + "][name]' placeholder='Field name' value=''> <input type='text' class='itt_type1 ww43' name='pagebuilder[page_settings][portfolio][skills][" + skill_rand + "][value]' placeholder='Field value' value=''> <span class='remove_skill'><i class='stand_icon fa fa-times'></i></span></li>");
        jQuery('.new_added').slideDown(300).removeClass('.new_added');
    });

    jQuery(document).on('click', '.remove_skill', function () {
        jQuery(this).parents("li").slideUp(300, function () {
            jQuery(this).remove();
        });
    });
	
	/* OPEN POPUP EDIT */
    function show_settings_popup(thisTrigger, popupContainerClass) {
        gt3_popupAutoH();
        if (typeof popupContainerClass != 'undefined') {
            var edit_popup_area = jQuery("." + popupContainerClass);
            var gt3_popup_initialed = thisTrigger;
        } else {
            var edit_popup_area = thisTrigger.parents('.item-with-settings').find('.edit_popup');
        }
        edit_popup_area.fadeToggle('fast').addClass('nowOpen');
        jQuery('.popup-bg').fadeIn('fast');
        var pop_width = jQuery('.edit_popup.nowOpen').width();
        var pop_height = jQuery('.edit_popup.nowOpen').height();
        var offset_width = pop_width / 2;
        var offset_height = pop_height / 2;
        jQuery('.edit_popup.nowOpen').css('marginLeft', '-' + offset_width + 'px');
        jQuery('.edit_popup.nowOpen').css('marginTop', '-' + offset_height + 'px');

        if (jQuery('.edit_popup.nowOpen').find('.tinyCont').size() > 0) {
            jQuery('.edit_popup.nowOpen').find('.tinyCont').each(function () {
                set_id = jQuery(this).find('textarea').attr('id')
                tinymce.execCommand('mceAddEditor', false, set_id);
            });
        }
        thisTrigger.addClass("popup_open_from_here");
    }

    jQuery(document).on('click', '.all_available_port_skills_icons i', function () {
        jQuery('.popup_open_from_here').val(jQuery(this).attr('class'));
        close_settings_popup();
    });

    /* CLOSE POPUP EDIT */
    function close_settings_popup() {
        if (jQuery('.edit_popup.nowOpen').find('.tinyCont').size() > 0) {
            jQuery('.edit_popup.nowOpen').find('.tinyCont').each(function () {
                set_id = jQuery(this).find('textarea').attr('id');
                tinymce.execCommand('mceRemoveControl', true, set_id);
            });
        }
        jQuery('.edit_popup.nowOpen').fadeOut('fast');
        jQuery('.popup-bg').fadeOut('fast');
        setTimeout("jQuery('.edit_popup.nowOpen').css('marginLeft', '0px').css('marginTop', '0px').removeClass('nowOpen')", 300);
        jQuery('.popup_open_from_here').removeClass('popup_open_from_here');
    }

    jQuery(document).on('click', '.inter_edit, .module-cont .edit.box-with-icon .control-element', function () {
        show_settings_popup(jQuery(this));
    });

    jQuery(document).on('click', '.popup-bg, .done-btn', function () {
        close_settings_popup();
    });

    jQuery('.sortable-img-items').sortable({placeholder: 'ui-state-highlight', handle: '.inter_drag'});
    jQuery('.sortable-modules').sortable({placeholder: 'ui-state-highlight', handle: '.dragger'});
    jQuery('.sections').sortable({placeholder: 'ui-state-highlight-sections', handle: '.some-element.move'});
    jQuery('.feature-list').sortable({placeholder: 'ui-state-highlight-sections', handle: '.some-element2.move'});

    /* Click & add img to background container */
    jQuery(document).on('click', '.bg_or_slider_option.bg_type .available_media_item', function () {
        var for_bg_data_full_url = jQuery(this).find('.previmg').attr('data-full-url');
        var for_bg_data_preview_bg_image = jQuery(this).find('.previmg').attr('data-thumb-url');
        jQuery('.bg_or_slider_option.bg_type .preview_bg_image').fadeOut('fast', function () {
            jQuery('.bg_or_slider_option.bg_type .preview_bg_image').delay(200).attr('src', for_bg_data_preview_bg_image).fadeIn('fast');
        });
        jQuery('.bg_or_slider_option.bg_type .bg_image_src').val(for_bg_data_full_url);
    });
	
	jQuery(document).on("click", ".select_icon_and_insert_here", function () {
        show_settings_popup(jQuery(this), "all_available_port_skills_icons");
    });
	
	jQuery(document).on('click', '.img-item .inter_x', function () {
        jQuery(this).parents(".img-item").hide('fast', function () {
            jQuery(this).remove();
        });
    });
	
	/* SELECT BOX */
    jQuery(".admin_newselect").selectBox();
    /* END SELECT BOX */
	
	jQuery('.custom_select_img_preview').on("click", function(){
		jQuery(this).find('img').remove();
		jQuery('.custom_select_img_attachid').val('');
	});

    // Sidebar Layout
    if (jQuery('.sidebar_layout').val() == 'none') {
        jQuery('.sidebar_none').slideUp(1);
    }
    if (jQuery('.sidebar_layout').val() == 'default') {
        if (jQuery('.select_sidebar').hasClass('sidebar_none')) {
            jQuery('.sidebar_none').slideUp(1);
        }
    }

    jQuery('.sidebar_layout').change(function(){
        if (jQuery(this).val() == 'no-sidebar') {
            jQuery('.select_sidebar').stop().slideUp(300);
        } else {
            jQuery('.select_sidebar').stop().slideDown(300);
        }
        if (jQuery(this).val() == 'default') {
            if (jQuery('.select_sidebar').hasClass('sidebar_none')) {
                jQuery('.select_sidebar').stop().slideUp(300);
            } else {
                jQuery('.select_sidebar').stop().slideDown(300);
            }
        }
    });

    
    /* Menu Settings */

    jQuery(document).on('click', '.gt3_remove_this_icon', function () {
        jQuery(this).parent().next().find('.gt3_select_icon_ultimate').val('');
        jQuery(this).parent().next().find('.gt3_select_icon_ultimate').next().removeClass().addClass('gt3_preview_icon');
    });

    /* Save Menu Settings */
    jQuery(document).on('click', '.gt3_save_menu_settings', function () {
        var gt3_edit_menu_settings_popup_container = jQuery(this).parents('.gt3_edit_menu_settings_popup');
        var gt3_menu_edited_id = gt3_edit_menu_settings_popup_container.find('.gt3_menu_edited_id').val();
        var gt3_menu_edited_depth = gt3_edit_menu_settings_popup_container.find('.gt3_menu_edited_depth').val();
        var gt3_select_icon_ultimate = gt3_edit_menu_settings_popup_container.find('.gt3_select_icon_ultimate').val();
        var gt3_megamenu_columns = gt3_edit_menu_settings_popup_container.find('.gt3_megamenu_columns').val();
        var gt3_megamenu_status = gt3_edit_menu_settings_popup_container.find('.gt3_megamenu_status').attr('checked');

        jQuery.post(ajaxurl, {
            action: 'gt3_save_menu_settings',
            gt3_menu_edited_id: gt3_menu_edited_id,
            gt3_select_icon_ultimate: gt3_select_icon_ultimate,
            gt3_megamenu_status: gt3_megamenu_status,
            gt3_megamenu_columns: gt3_megamenu_columns,
            gt3_menu_edited_depth: gt3_menu_edited_depth
        }, function (response) {
            jQuery.colorbox.close();
        });

    });

    // Post Layout (blog-portfolio)
    var j_media_type = jQuery('.media_type');
    var j_media_fullscreen_container = jQuery('.media_fullscreen_container');

    if (j_media_type.val() == 'classic_type') {
        jQuery('.fullscreen_container_section').slideUp(1);
    }

    if (j_media_type.val() == 'in_the_header_type' && j_media_fullscreen_container.val() == 'fullscreen_allow_on') {
        jQuery('.container_height_section').slideUp(1);
    }

    j_media_fullscreen_container.change(function(){
        if (j_media_type.val() == 'in_the_header_type' && jQuery(this).val() == 'fullscreen_allow_on') {
            jQuery('.container_height_section').stop().slideUp(300);
        } else {
            jQuery('.container_height_section').stop().slideDown(300);
        }
        if (j_media_type.val() == 'in_the_header_type' && jQuery(this).val() == 'fullscreen_allow_off') {
            jQuery('.container_height_section').stop().slideDown(300);
        }
    });

    j_media_type.change(function(){
        if (jQuery(this).val() == 'classic_type') {
            jQuery('.fullscreen_container_section').stop().slideUp(300);
            jQuery('.container_height_section').stop().slideDown(300);
        } else {
            jQuery('.fullscreen_container_section').stop().slideDown(300);
            jQuery('.container_height_section').stop().slideUp(300);
        }
        if (jQuery(this).val() == 'in_the_header_type' && j_media_fullscreen_container.val() == 'fullscreen_allow_off') {
            jQuery('.container_height_section').stop().slideDown(300);
        }
    });

    // Fullwidth wideo
    if (jQuery('.portfolio_post_style_layout').val() == 'simple-portfolio') {
        jQuery('.video_proportion').slideUp(1);
    }
    if (jQuery('.portfolio_post_style_layout').val() == 'default') {
        if (jQuery('.video_proportion').hasClass('hide_area')) {
            jQuery('.video_proportion').slideUp(1);
        }
    }
    jQuery('.portfolio_post_style_layout').change(function(){
        if (jQuery(this).val() == 'simple-portfolio') {
            jQuery('.video_proportion').stop().slideUp(300);
        } else {
            jQuery('.video_proportion').stop().slideDown(300);
        }
        if (jQuery(this).val() == 'default') {
            if (jQuery('.video_proportion').hasClass('hide_area')) {
                jQuery('.video_proportion').stop().slideUp(300);
            } else {
                jQuery('.video_proportion').stop().slideDown(300);
            }
        }
    });

});

jQuery(window).load(function () {
	 /* POST FORMATS */
	var nowpostformat = jQuery('#post-formats-select input:checked').val();
	var nowNEWpostformat = jQuery('.post-format-options a.active').attr("data-wp-format");
	if (nowpostformat == 'image' || nowNEWpostformat == 'image') {
		jQuery('#portslides_sectionid_inner').show();
		jQuery('.wp-admin.post-type-post #pb_section').show();
	}
	else if (nowpostformat == 'video') {
		jQuery('#video_sectionid_inner').show();
		jQuery('.wp-admin.post-type-post #pb_section').show();
	}
	else if (nowpostformat == '0' || nowNEWpostformat == 'standard') {
		jQuery('#default_sectionid_inner').show();
		//jQuery('.wp-admin.post-type-post #pb_section').hide();
	}

	/* ON CHANGE */
	/* WP <=3.5 */
	jQuery('#post-formats-select input').on("click", function () {
		jQuery('#portslides_sectionid_inner, #video_sectionid_inner, #default_sectionid_inner').hide();
		var nowclickformat = jQuery(this).val();
		if (nowclickformat == 'image') {
			jQuery('#portslides_sectionid_inner').show();
			jQuery('.wp-admin.post-type-post #pb_section').show();
		}
		else if (nowclickformat == 'video') {
			jQuery('#video_sectionid_inner').show();
			jQuery('.wp-admin.post-type-post #pb_section').show();
		}
		else if (nowclickformat == '0') {
			jQuery('#default_sectionid_inner').show();
			//jQuery('.wp-admin.post-type-post #pb_section').hide();
		}
	});
	/* WP >=3.6 */
	jQuery('.post-format-options a').on("click", function () {
		jQuery('#portslides_sectionid_inner, #video_sectionid_inner, #default_sectionid_inner').hide();
		var nowclickformat = jQuery(this).attr("data-wp-format");
		if (nowclickformat == 'image') {
			jQuery('#portslides_sectionid_inner').show();
		}
		if (nowclickformat == 'standard') {
			jQuery('#default_sectionid_inner').show();
		}
	});

	jQuery('.cw_field_counter').val(jQuery('.cw_field_wrapper').size());
});

jQuery(document).on("click", ".add-new-field", function( event ){
		var field_name = jQuery(this).attr('data-var'),
			field_count = jQuery('.cw_field_counter').val(),
			full_field_name = jQuery(this).attr('data-var');
		field_name = field_name.substring(0, field_name.length - 2);
		field_count++;
        jQuery(this).parents(".contact_widget_wrapper").find(".contact_widget_content").append("<div class='cw_new_added cw_field_wrapper' style='display:none'><input type='text' class='cw_field_input cw_field_name' name='"+ field_name +"[gt3_cw_field_name"+field_count+"]' placeholder='Field Name' value=''><textarea placeholder='Field Value' name='"+ field_name +"[gt3_cw_field_value"+field_count+"]' class='xxlarge admin_textareaoption type1 cw_textarea'></textarea><span class='cw_remove_field' data-var='"+full_field_name+"'><i class='stand_icon fa fa-times'></i></span></div>");
		jQuery('.cw_field_counter').val(field_count);
        jQuery('.cw_new_added').slideDown(300).removeClass('.cw_new_added');	
});

jQuery(document).on("click", ".cw_remove_field", function( event ){
	jQuery(this).parents('.cw_field_wrapper').slideUp(300,function(){
		jQuery(this).remove();
	});
	var field_name = jQuery(this).attr('data-var'),
		field_count = jQuery('.cw_field_counter').val(),
		i = 1;
	field_name = field_name.substring(0, field_name.length - 2);
	field_count--;
	jQuery('.cw_field_counter').val(field_count);
	jQuery('.cw_field_wrapper').each(function(){
		jQuery(this).find('.cw_field_name').attr('name', field_name +'[gt3_cw_field_name'+i+']');
		jQuery(this).find('.cw_field_value').attr('name', field_name +'[gt3_cw_field_value'+i+']');
		i++;
	});
});

// Attach Image (Coming Soon) 
var file_frame;
jQuery(document).on("click", ".add_image_from_wordpress_library_popup", function( event ){
    var custom_select_select_image = jQuery(this).parents(".boxed_options");
    event.preventDefault();

    file_frame = wp.media.frames.file_frame = wp.media({
        title: jQuery( this ).data( 'uploader_title' ),
        button: {
            text: jQuery( this ).data( 'uploader_button_text' )
        },
        multiple: false
    });

    file_frame.on( 'select', function() {
        attachment = file_frame.state().get('selection').first().toJSON();
        custom_select_select_image.find(".custom_select_img_attachid").val(attachment.id);
       	custom_select_select_image.find(".custom_select_img_preview").html("<img src='"+attachment.url+"' alt=''>");
    });

    file_frame.open();
});

// Attach Video-Thumbnail (Gallery) 
var file_frame_new;
jQuery(document).on("click", ".select_attach_id_from_media_library", function( event ){
    var select_image_root = jQuery(this).parents(".select_image_root");
    event.preventDefault();

    file_frame_new = wp.media.frames.file_frame = wp.media({
        title: jQuery( this ).data( 'uploader_title' ),
        button: {
            text: jQuery( this ).data( 'uploader_button_text' )
        },
        multiple: false
    });

    file_frame_new.on( 'select', function() {
        attachment = file_frame_new.state().get('selection').first().toJSON();
        select_image_root.find(".select_img_attachid").val(attachment.id);
        select_image_root.find(".select_img_preview").html("<img src='"+attachment.url+"' alt=''>");
    });

    file_frame_new.open();
});

jQuery(document).on("click", ".gt3_radio_toggle_cont", function () {
	var cur_val = jQuery(this).find('.gt3_checkbox_value').val();	
	if (cur_val == 'on') {
		jQuery(this).find(".gt3_radio_toggle_mirage").removeClass("checked").addClass("not_checked");
		jQuery(this).find('.gt3_checkbox_value').val('off');
	} else {
		jQuery(this).find(".gt3_radio_toggle_mirage").removeClass("not_checked").addClass("checked");
		jQuery(this).find('.gt3_checkbox_value').val('on');
	}
});	

jQuery(document).on("click", ".gt3_packery_ls_item", function () {	
	var cur_wrapper = jQuery(this).parents('.gt3_packery_ls_cont'),
		cur_val = jQuery(this).attr('data-value');
		cur_wrapper.find('.checked').removeClass('checked');
		cur_wrapper.find('.gt3_packery_ls_value').val(cur_val);
		cur_wrapper.find('.'+cur_val).addClass('checked');
});	

function check_visual_part_for_toggles() {
    jQuery(".radio_toggle_cont").each(function (index) {
        var yes_state = jQuery(this).find('.yes_state').attr('checked');
        var no_state = jQuery(this).find('.no_state').attr('checked');

        if (yes_state == 'checked') {
            //alert("yes");
            jQuery(this).find(".no_state").removeAttr("checked");
            jQuery(this).find(".radio_toggle_mirage").removeClass("not_checked").addClass("checked");
            jQuery(this).find(".radio_toggle_mirage").stop().animate({backgroundPosition:'0% 0%'}, {duration:'fast'});
        } else {
            //alert("no");
            jQuery(this).find(".yes_state").removeAttr("checked");
            jQuery(this).find(".radio_toggle_mirage").removeClass("checked").addClass("not_checked");
            jQuery(this).find(".radio_toggle_mirage").stop().animate({backgroundPosition:'100% 0%'}, {duration:'fast'});
        }

    });
}

jQuery(document).on('click', '.page_fs_slider_toggler .radio_toggle_mirage', function(){
	if (jQuery('.page_fs_slider_toggler').find('.yes_state').attr('checked') == 'checked') {
		jQuery('.page_fs_slider_block').slideUp(300);
	} else {
		jQuery('.page_fs_slider_block').slideDown(300);
	}		
});
jQuery(document).on("change", ".select_gallery_type", function (event) {
	var cur_val = jQuery(this).val();
	jQuery('.gallery_type_settings').hide();
	jQuery('.gallery_type_'+cur_val).show();
});
jQuery(document).on('click', '.gt3_categ_checkbox', function(){
	var this_container = jQuery(this).parents('.gt3_categories_wrapper'),
		this_input = this_container.find('.gt3_categ_value'),
		set_string = '';
	this_container.find('.gt3_categ_checkbox').each(function(){
		if (jQuery(this).attr('checked')) {
			set_string = set_string + jQuery(this).attr('data-val') + ' ';
		} else {
		}
	});
	set_string.substring(0, set_string.length - 1);
	this_input.val(set_string);
});