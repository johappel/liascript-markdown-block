import { __ } from '@wordpress/i18n';
import React, { useEffect } from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-min-noconflict/mode-markdown";


import { InspectorControls,useBlockProps, BlockControls, BlockAlignmentToolbar  } from '@wordpress/block-editor';
import { useState, useRef  } from '@wordpress/element';
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
    const [activeTab, setActiveTab] = useState('preview');

    const { content, postAuthor,iframeHeight, iframeSrc, align, lia } = attributes;
    let [header, setHeader] = useState('');

    const iframeRef = useRef(null);


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
        const course = (typeof liaScriptBlockData !== 'undefined' && liaScriptBlockData.pluginDir)
            ? liaScriptBlockData.pluginDir+'liascript/'
            : '/liascript/';
        if(course){
            setAttributes({ lia: { course: course, editor: lia.editor, search: lia.search } });
        }

    }, [postAuthor, content, setAttributes]);

    /**
     * Überwacht Änderungen am Content
     */
    useEffect(() => {
        const checkIframeContent = () => {

            const iframeDoc = iframeRef.current?.contentWindow?.document;
            if (!iframeDoc) return;

            const liaCanvas = iframeDoc.querySelector('.lia-canvas');
            if (liaCanvas) {

                liaCanvas.classList.remove("lia-navigation--visible");
                liaCanvas.classList.add("lia-navigation--hidden");

                const liaTocSearch = iframeDoc.querySelector('.lia-toc__search');
                if (liaTocSearch) {
                    liaTocSearch.style.display = "none";
                }

                const liaBtnHome = iframeDoc.querySelector('#lia-btn-home');
                if (liaBtnHome && liaBtnHome.parentElement) {
                    liaBtnHome.parentElement.style.display = "none";
                }


            } else {
                // Warten und erneut überprüfen
                setTimeout(checkIframeContent, 50);
            }
        };

        if (activeTab === 'preview' && iframeRef.current) {
            iframeRef.current.addEventListener('load', checkIframeContent);
        }

        // Bereinigung
        return () => {
            if (iframeRef.current) {
                iframeRef.current.removeEventListener('load', checkIframeContent);
            }
        };

    }, [activeTab]); // Reagiert auf Änderungen von iframeRef und Vorschau im Editor

        // Update the content on change
    const onChangeContent = ( newContent ) => {

		setAttributes({ content: newContent });
        setAttributes({ iframeSrc: createGzipBase64Data(header+content) });
        setAttributes({ headermd: header });



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
                            isPressed={activeTab === 'preview'}
                            onClick={() => setActiveTab('preview')}
                        >
                            {__("Vorschau", 'liascript-markdown-block')}
                        </ToolbarButton>
                        <ToolbarButton
                            isPressed={activeTab === 'editor'}
                            onClick={() => setActiveTab('editor')}
                        >
                            {__("Bearbeiten", 'liascript-markdown-block')}
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
            {/* Tabs und Iframe */}
            {activeTab === 'preview' && (
                <div>
                    <div className="liascript-links">
                        <a href={`${lia.editor + iframeSrc}`}><span
                            className="dashicons dashicons-edit"></span> Remix</a>
                        <a href={`${lia.course + lia.search + iframeSrc}`}><span
                            className="dashicons dashicons-media-interactive"></span> Present</a>
                    </div>
                    <iframe className="course-view"
                            ref={iframeRef}
                            width="100%"
                            height={`${iframeHeight}px`}
                            src={`${lia.course + lia.search + iframeSrc}`}
                            frameBorder="0"
                            scrolling="no"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    ></iframe>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 10,
                            backgroundColor: 'transparent',
                            pointerEvents: 'none'
                        }}
                    ></div>

                </div>
            )}
            {activeTab === 'editor' && (
                <AceEditor
                    mode="markdown"
                    onChange={onChangeContent}
                    name={editorId}
                    value={content}
                    width="100%"
                    editorProps={{$blockScrolling: true }}
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

        </div>
    );
}
