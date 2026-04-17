import React, { useId, useMemo, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ChevronLeft } from 'react-bootstrap-icons';
import { NavLink, useLocation } from 'react-router-dom';
import { Collapse } from 'reactstrap';

import Icon from '../../Icon/Icon';
import s from './LinksGroup.module.scss';

const LinksGroup = ({ childrenLinks, className, glyph, header, headerLink }) => {
  const location = useLocation();
  const panelId = useId();
  const hasChildren = Boolean(childrenLinks?.length);
  const isGroupActive = useMemo(() => {
    if (!headerLink) {
      return false;
    }

    return location.pathname === headerLink || location.pathname.startsWith(`${headerLink}/`);
  }, [headerLink, location.pathname]);
  const [isOpen, setIsOpen] = useState(isGroupActive);
  const panelOpen = isOpen || isGroupActive;

  if (!hasChildren) {
    return (
      <li className={cx(s.headerLink, className)}>
        <NavLink
          className={({ isActive }) => (isActive ? s.headerLinkActive : undefined)}
          end
          to={headerLink}
        >
          <div>
            {glyph ? <Icon decorative glyph={glyph} /> : null}
            <span>{header}</span>
          </div>
        </NavLink>
      </li>
    );
  }

  return (
    <li className={cx(s.headerLink, className)}>
      <button
        aria-controls={panelId}
        aria-expanded={panelOpen}
        className={cx('w-100 border-0 bg-transparent d-flex align-items-center justify-content-between', {
          [s.headerLinkActive]: isGroupActive,
        })}
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <div>
          {glyph ? <Icon decorative glyph={glyph} /> : null}
          <span>{header}</span>
        </div>
        <ChevronLeft aria-hidden="true" className={cx(s.arrow, { [s.arrowActive]: panelOpen })} size={16} />
      </button>
      <Collapse className={s.panel} id={panelId} isOpen={panelOpen}>
        <ul>
          {childrenLinks.map((child) => (
            <li key={child.name}>
              <NavLink
                className={({ isActive }) => (isActive ? s.headerLinkActive : undefined)}
                end
                to={child.link}
              >
                {child.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </Collapse>
    </li>
  );
};

LinksGroup.propTypes = {
  header: PropTypes.node.isRequired,
  headerLink: PropTypes.string,
  childrenLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
  glyph: PropTypes.string,
  className: PropTypes.string,
};

LinksGroup.defaultProps = {
  headerLink: null,
  childrenLinks: null,
  className: '',
  glyph: null,
};

export default LinksGroup;
