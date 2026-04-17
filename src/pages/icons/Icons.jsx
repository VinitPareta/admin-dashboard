import React, { startTransition, useDeferredValue, useMemo, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Input,
  Row,
} from 'reactstrap';
import {
  Alarm as AlarmIcon,
  AppIndicator as AppIndicatorIcon,
  Archive as ArchiveIcon,
  ArrowClockwise as ArrowClockwiseIcon,
  BarChart as BarChartIcon,
  Bell as BellIcon,
  Binoculars as BinocularsIcon,
  Bookmark as BookmarkIcon,
  Briefcase as BriefcaseIcon,
  BrowserChrome as BrowserChromeIcon,
  CalendarEvent as CalendarEventIcon,
  Camera as CameraIcon,
  ChatSquareText as ChatSquareTextIcon,
  CheckCircle as CheckCircleIcon,
  ClipboardData as ClipboardDataIcon,
  Cloud as CloudIcon,
  Cpu as CpuIcon,
  Display as DisplayIcon,
  Download as DownloadIcon,
  Envelope as EnvelopeIcon,
  ExclamationTriangle as ExclamationTriangleIcon,
  Eye as EyeIcon,
  FileEarmarkText as FileEarmarkTextIcon,
  Filter as FilterIcon,
  Flag as FlagIcon,
  Folder as FolderIcon,
  Gear as GearIcon,
  GeoAlt as GeoAltIcon,
  Globe as GlobeIcon,
  Grid as GridIcon,
  Heart as HeartIcon,
  House as HouseIcon,
  Image as ImageIcon,
  Inbox as InboxIcon,
  Kanban as KanbanIcon,
  Lightning as LightningIcon,
  Lock as LockIcon,
  Map as MapIcon,
  MoonStars as MoonStarsIcon,
  Palette as PaletteIcon,
  People as PeopleIcon,
  PieChart as PieChartIcon,
  PinMap as PinMapIcon,
  Search as SearchIcon,
  ShieldCheck as ShieldCheckIcon,
  Sliders as SlidersIcon,
  Star as StarIcon,
  Telephone as TelephoneIcon,
  Terminal as TerminalIcon,
  Trash as TrashIcon,
  Trophy as TrophyIcon,
  Upload as UploadIcon,
  Wifi as WifiIcon,
  Wrench as WrenchIcon,
} from 'react-bootstrap-icons';

import Widget from '../../components/Widget';
import s from './Icons.module.scss';

const iconEntries = [
  ['Alarm', AlarmIcon],
  ['AppIndicator', AppIndicatorIcon],
  ['Archive', ArchiveIcon],
  ['ArrowClockwise', ArrowClockwiseIcon],
  ['BarChart', BarChartIcon],
  ['Bell', BellIcon],
  ['Binoculars', BinocularsIcon],
  ['Bookmark', BookmarkIcon],
  ['Briefcase', BriefcaseIcon],
  ['BrowserChrome', BrowserChromeIcon],
  ['CalendarEvent', CalendarEventIcon],
  ['Camera', CameraIcon],
  ['ChatSquareText', ChatSquareTextIcon],
  ['CheckCircle', CheckCircleIcon],
  ['ClipboardData', ClipboardDataIcon],
  ['Cloud', CloudIcon],
  ['Cpu', CpuIcon],
  ['Display', DisplayIcon],
  ['Download', DownloadIcon],
  ['Envelope', EnvelopeIcon],
  ['ExclamationTriangle', ExclamationTriangleIcon],
  ['Eye', EyeIcon],
  ['FileEarmarkText', FileEarmarkTextIcon],
  ['Filter', FilterIcon],
  ['Flag', FlagIcon],
  ['Folder', FolderIcon],
  ['Gear', GearIcon],
  ['GeoAlt', GeoAltIcon],
  ['Globe', GlobeIcon],
  ['Grid', GridIcon],
  ['Heart', HeartIcon],
  ['House', HouseIcon],
  ['Image', ImageIcon],
  ['Inbox', InboxIcon],
  ['Kanban', KanbanIcon],
  ['Lightning', LightningIcon],
  ['Lock', LockIcon],
  ['Map', MapIcon],
  ['MoonStars', MoonStarsIcon],
  ['Palette', PaletteIcon],
  ['People', PeopleIcon],
  ['PieChart', PieChartIcon],
  ['PinMap', PinMapIcon],
  ['Search', SearchIcon],
  ['ShieldCheck', ShieldCheckIcon],
  ['Sliders', SlidersIcon],
  ['Star', StarIcon],
  ['Telephone', TelephoneIcon],
  ['Terminal', TerminalIcon],
  ['Trash', TrashIcon],
  ['Trophy', TrophyIcon],
  ['Upload', UploadIcon],
  ['Wifi', WifiIcon],
  ['Wrench', WrenchIcon],
];

const toIconSlug = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const Icons = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const filteredIcons = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return iconEntries;
    }

    return iconEntries.filter(([name]) => name.toLowerCase().includes(normalizedQuery));
  }, [deferredQuery]);

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Icons</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Icons</h1>
      <Widget
        title={(
          <div className="d-flex flex-column gap-3">
            <div>
              <h5 className="mt-0 mb-1">Bootstrap icon explorer</h5>
              <p className="mb-0 text-muted">
                Live filter uses React 19 deferred rendering so large icon sets stay responsive.
              </p>
            </div>
            <Input
              onChange={(event) => {
                const nextValue = event.target.value;
                startTransition(() => setQuery(nextValue));
              }}
              placeholder="Search icons..."
              type="search"
              value={query}
            />
          </div>
        )}
      >
        <Row className="icon-list">
          {filteredIcons.map(([name, IconComponent]) => (
            <Col className="icon-list-item" key={name} lg={4} md={6}>
              <a
                href={`https://icons.getbootstrap.com/icons/${toIconSlug(name)}/`}
                rel="noreferrer"
                target="_blank"
              >
                <IconComponent className="bi" />
                {name}
              </a>
            </Col>
          ))}
        </Row>
      </Widget>
    </div>
  );
};

export default Icons;
