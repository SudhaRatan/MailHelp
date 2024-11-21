interface ContentProps {
  htmlContent: string
}
export const HTMLContentRenderer = ({ htmlContent }: ContentProps) => {
  if (!htmlContent) {
    return <div className="text-gray-500">No content available</div>;
  }

  return (
    <div 
      // className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: (htmlContent.slice(0, htmlContent.indexOf('<style type="text/css">')) + htmlContent.slice(htmlContent.indexOf('</style>')+8)) }}
    />
  );
};