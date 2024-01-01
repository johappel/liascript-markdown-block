<?php
/**
 * Plugin Name:       Liascript Markdown Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Joachim Happel
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       liascript-markdown-block
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function liascript_markdown_block_liascript_markdown_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'liascript_markdown_block_liascript_markdown_block_block_init' );

function enqueue_block_editor_assets() {
    // Pfad zum gebauten JavaScript-Datei
    $block_path = '/build/index.js';
    $dir = get_template_directory_uri();

    // Skript einreihen
    wp_enqueue_script(
        'lia-script-markdown-block-editor',
        $dir . $block_path,
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
        filemtime($dir . $block_path)
    );

    // Holen Sie sich den Autor des aktuellen Beitrags
    global $post;
    $post_author = get_the_author_meta('display_name', $post->post_author);

    // Daten an das Skript übergeben
    wp_localize_script('lia-script-markdown-block-editor', 'liaScriptBlockData', array(
        'postAuthor' => $post_author,
    ));
}
add_action('enqueue_block_editor_assets', 'enqueue_block_editor_assets');

