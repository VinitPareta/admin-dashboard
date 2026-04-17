import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import s from './Widget.module.scss';

const Widget = ({ children, className, title }) => (
  <section className={cx(s.widget, className)}>
    {title
      ? typeof title === 'string'
        ? <h5 className={s.title}>{title}</h5>
        : <header className={s.title}>{title}</header>
      : null}
    <div>{children}</div>
  </section>
);

Widget.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Widget.defaultProps = {
  title: null,
  className: '',
  children: [],
};

export default Widget;
