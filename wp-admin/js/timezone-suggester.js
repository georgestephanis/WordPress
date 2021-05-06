(function($){

	// This may need some browser support checks to make sure it's there --
	// https://caniuse.com/mdn-javascript_builtins_intl_datetimeformat_resolvedoptions_computed_timezone
	const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const $tzSelect = $('#timezone_string');
	const __ = wp.i18n.__;

	if ( 0 === $tzSelect.length ) {
		return;
	}

	if ( $tzSelect.data('autoselect') && $tzSelect.find('option[value="' + browserTz + '"]').length ) {
		// For installation where we want the option to default to existing, if it exists.
		$tzSelect.val( browserTz );
	} else {
		// For options-general.php where we wouldn't update the value without explicit user action.
		if ( $tzSelect.val() !== browserTz && $tzSelect.find('option[value="' + browserTz + '"]').length ) {
			$tzSelect.after( __( '<p>Your browser timezone is currently set to <code>%1$s</code> -- <a class="updateTzSelectToBrowser" href="#">would you like to update the WordPress timezone to match?</a></p>' ).replace( '%1$s', browserTz ) );
			$tzSelect.parent().find('.updateTzSelectToBrowser').on( 'click', function(e){
				e.preventDefault();
				$tzSelect.val( browserTz );
				$(this).parents('p').text( __( 'Updated!' ) ).fadeOut('slow');
			})
		}

	}

})(jQuery);
