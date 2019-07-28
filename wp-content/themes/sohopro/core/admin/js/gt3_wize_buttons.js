(function() {
	tinymce.create('tinymce.plugins.gt3_wize_buttons', {
		init : function(ed, url) {
			ed.addButton('gt3_blockquote', {
				title : 'Wize Blockquote',
				image : gt3_admin_themeurl + '/core/admin/img/btn_quote.png',
				onclick : function() {
					var selected_text = ed.selection.getContent();
					if (selected_text !== '') {
						ed.selection.setContent('<blockquote class="gt3_quote"><div class="gt3_quote_content">'+ selected_text +'</div><div class="gt3_quote_author">Author Name</div></blockquote>');
					} else {
						ed.selection.setContent('<blockquote class="gt3_quote"><div class="gt3_quote_content">Blockquote Text</div><h6 class="gt3_quote_author">Author Name</h6></blockquote>');
					}					
					
				}
			});
			ed.addButton('gt3_dropcap', {
				title : 'Wize Dropcap',
				image : gt3_admin_themeurl + '/core/admin/img/btn_dropcap.png',
				onclick : function() {
					var selected_text = ed.selection.getContent();
					if (selected_text !== '') {
						ed.selection.setContent('<span class="gt3_dropcap">'+ selected_text +'</span>');
					} else {
						ed.selection.setContent('<span class="gt3_dropcap">A</span>');
					}
				}
			});
		},
		createControl : function(n, cm) {
			return null;
		},
	});
	tinymce.PluginManager.add('gt3_wize_buttons', tinymce.plugins.gt3_wize_buttons);
})();