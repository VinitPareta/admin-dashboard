import React from 'react';
import PropTypes from 'prop-types';

import icons from './icons';

const Icon = ({ className, decorative, glyph, label }) => {
  if (!icons[glyph]) {
    return null;
  }

  return (
    <img
      alt={decorative ? '' : label ?? `${glyph} icon`}
      aria-hidden={decorative ? 'true' : undefined}
      className={className}
      src={icons[glyph]}
    />
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  decorative: PropTypes.bool,
  glyph: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  decorative: true,
  label: null,
};

export default Icon;
