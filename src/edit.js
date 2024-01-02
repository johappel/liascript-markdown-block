import { __ } from '@wordpress/i18n';
import React, { useEffect } from 'react';
import AceEditor from 'react-ace';


import "ace-builds/src-min-noconflict/mode-markdown";


import { InspectorControls,useBlockProps, BlockControls, BlockAlignmentToolbar  } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { PanelBody,  TextareaControl, ToolbarGroup, ToolbarButton, TabPanel } from '@wordpress/components';
import { RangeControl } from '@wordpress/components';
import { createGzipBase64Data } from './createGzipBase64Data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes, isSelected, clientId } ) {
    const blockProps = useBlockProps();
    const [activeTab, setActiveTab] = useState('editor');

    const { content, postAuthor,iframeHeight, iframeSrc, align, lia } = attributes;
    let [header, setHeader] = useState('');


    useEffect(() => {
        const postAuthor = (typeof liaScriptBlockData !== 'undefined' && liaScriptBlockData.postAuthor)
            ? liaScriptBlockData.postAuthor
            : 'Post Author';
        // Setze den Autor, wenn er noch nicht gesetzt ist
        if (!postAuthor || postAuthor === 'Post Author') {
            setAttributes({ postAuthor: liaScriptBlockData.postAuthor || 'Post Author' });
        }

        // Konstruiere den Header, sobald der Autor verfügbar ist
        header = `
<!--
author:   ${postAuthor}
email:    info@rpi-virtuell.de
version:  0.0.1
language: de
narrator: DE German Female
link:     https://rpi-virtuell.de/liascript-inline.css
-->
`;

        // Setze den Anfangs-Content, wenn noch kein Content vorhanden ist
        if (!content) {
            setAttributes({ content: '# Folie 1' });
            setAttributes({ iframeSrc: createGzipBase64Data(header+content) });

        }
    }, [postAuthor, content, setAttributes]);

    // Update the content on change
    const onChangeContent = ( newContent ) => {
		setAttributes({ content: newContent });
        setAttributes({ iframeSrc: createGzipBase64Data(header+content) });
    };
    const onChangeIframeHeight = (newHeight) => {
        setAttributes({ iframeHeight: newHeight });
    };
    const onChangeAlignment = (newAlign) => {
        setAttributes({ align: newAlign });
    };

    // Erstellen Sie eine einzigartige ID für den Ace-Editor
    const editorId = `ace-editor-${clientId}`;

    return (
        <div { ...blockProps }>
            {isSelected && (
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            isPressed={activeTab === 'editor'}
                            onClick={() => setActiveTab('editor')}
                        >
                            {__("LiaScript", 'liascript-markdown-block')}
                        </ToolbarButton>
                        <ToolbarButton
                            isPressed={activeTab === 'preview'}
                            onClick={() => setActiveTab('preview')}
                        >
                            {__("Vorschau", 'liascript-markdown-block')}
                        </ToolbarButton>
                        <BlockAlignmentToolbar
                            value={align}
                            onChange={onChangeAlignment}
                        />
                    </ToolbarGroup>
                </BlockControls>
            )}
            <InspectorControls>
                <PanelBody title={__('Iframe-Einstellungen', 'liascript-markdown-block')}>
                    <RangeControl
                        label={__("Höhe des Liascript Blocks", 'liascript-markdown-block')}
                        value={iframeHeight || 600}
                        onChange={onChangeIframeHeight}
                        min={100}
                        max={1200}
                    />
                </PanelBody>
            </InspectorControls>
             {/* Hier Ihre Tabs und Iframe */}
            {activeTab === 'editor' && (
                <AceEditor
                    mode="markdown"
                    onChange={onChangeContent}
                    name={editorId}
                    value={content}
                    width="100%"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        useWorker: false,
                        tabSize: 4
                    }}

                />
            )}

            {activeTab === 'preview' && (
                <div>
                    <iframe
                        width="100%"
                        height={`${iframeHeight}px`}
                        src={`${lia.course+lia.search+iframeSrc}`}
                        frameBorder="0"
                    ></iframe>
                    <div className="liascript-links">
                        <a href={`${lia.editor+iframeSrc}`}><span className="dashicons dashicons-edit"></span> Remix</a>
                        <a href={`${lia.course+lia.search+iframeSrc}`}><span className="dashicons dashicons-media-interactive"></span> Present</a>
                    </div>
                </div>
            )}

        </div>
    );
}
