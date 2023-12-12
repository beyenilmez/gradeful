import React, { useEffect, useRef } from 'react';
import colorDataJSON from '../color-schemes/colorSchemes.json'

function replaceDomClasses(old1, new1, old2, new2) {
  // Get all elements in the document
  var allElements = document.querySelectorAll('*');

  // Loop through each element
  allElements.forEach(function (element) {
    var classNames = element.className;

    // Check if the element has class names containing the specified className
    if (classNames) {
      if (new RegExp('\\b' + old1 + '\\b').test(classNames)) {
        // Replace the specified className with its counterpart
        element.className = classNames.replace(new RegExp('\\b' + old1 + '\\b', 'g'), new1);
      }
      if (new RegExp('\\b' + old2 + '\\b').test(classNames)) {
        // Replace the specified className with its counterpart
        element.className = classNames.replace(new RegExp('\\b' + old2 + '\\b', 'g'), new2);
      }
    }
  })
}


const ColorSchemeDetector = () => {
  const shouldUpdateRef = useRef(true);

  const colorData = colorDataJSON;

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      if (shouldUpdateRef.current) {
        shouldUpdateRef.current = false;

        const oldTheme = localStorage.getItem('oldColorScheme');

        for (let scheme in colorData) {
          if (document.body.classList.contains(scheme)) {
            if (scheme !== 'default' && oldTheme !== 'default') {
              replaceDomClasses(colorData.default.primary, colorData[scheme].primary, colorData.default.secondary, colorData[scheme].secondary);
            }
            if (oldTheme !== scheme) {
              replaceDomClasses(colorData[oldTheme].primary, colorData[scheme].primary, colorData[oldTheme].secondary, colorData[scheme].secondary);
            }
            console.log('Color scheme changed from' + oldTheme + ' to ' + scheme);
          }
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
  }, [colorData]);

  return (
    <div />
  );
};

export default ColorSchemeDetector;