import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const { iframeHeight, iframeSrc , lia } = attributes;

	return (
		<figure { ...blockProps }>
			<div>
				<div className="wp-block-embed__wrapper">
					<iframe
						width="100%"
						height={`${iframeHeight}px`}
						src={`${lia.course+lia.search+iframeSrc}`}></iframe>
				</div>
				<div className="liascript-links">
					<a href={`${lia.editor+iframeSrc}`}><span className="dashicons dashicons-edit"></span> Remix</a>
					<a href={`${lia.course+lia.search+iframeSrc}`}><span className="dashicons dashicons-media-interactive"></span> Present</a>
				</div>
			</div>
		</figure>
	);
}
