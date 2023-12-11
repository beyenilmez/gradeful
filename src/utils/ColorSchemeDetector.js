import React, { useEffect , useRef} from 'react';

// Function to set color scheme by toggling class names
function setColorScheme(className) {
  // Get all elements in the document
  var allElements = document.querySelectorAll('*');

  // Loop through each element
  allElements.forEach(function (element) {
      var classNames = element.className;

      // Check if the element has class names containing the specified className
      if (classNames) {
          if (new RegExp('\\b' + className + '\\b').test(classNames)) {
              // Replace the specified className with its counterpart
              var newClassName = className === 'slate' ? 'mono' : 'slate';
              element.className = classNames.replace(new RegExp('\\b' + className + '\\b', 'g'), newClassName);
          }
      }
  });
}


const ColorSchemeDetector = () => {
  const shouldUpdateRef = useRef(true);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      if (shouldUpdateRef.current) {
        shouldUpdateRef.current = false;
        if (document.body.classList.contains('slate')) {
          setColorScheme('mono');
        } else {
          setColorScheme('slate');
        }
        shouldUpdateRef.current = true;
      }
    });

    observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div/>
  );
};

export default ColorSchemeDetector;