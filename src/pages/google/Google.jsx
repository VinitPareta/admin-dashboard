import React, { useMemo, useState } from 'react';
import { Badge, Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import { GeoAlt, Layers, PinMap } from 'react-bootstrap-icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import Widget from '../../components/Widget';
import s from './Google.module.scss';

const center = {
  lat: -37.813179,
  lng: 144.950259,
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const googleMapOptions = {
  clickableIcons: false,
  disableDefaultUI: true,
  fullscreenControl: true,
  gestureHandling: 'greedy',
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: true,
};

const formatCoordinate = (value) => `${value > 0 ? '+' : ''}${value.toFixed(5)}`;

const buildOsmEmbedUrl = () => {
  const latitudeOffset = 0.08;
  const longitudeOffset = 0.12;
  const bbox = [
    center.lng - longitudeOffset,
    center.lat - latitudeOffset,
    center.lng + longitudeOffset,
    center.lat + latitudeOffset,
  ].join(',');

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${center.lat}%2C${center.lng}`;
};

const osmLocationUrl = `https://www.openstreetmap.org/?mlat=${center.lat}&mlon=${center.lng}#map=13/${center.lat}/${center.lng}`;

const MapCanvas = ({ apiKey, onGoogleError, useGoogleProvider }) => {
  if (useGoogleProvider) {
    return (
      <LoadScript googleMapsApiKey={apiKey} onError={onGoogleError}>
        <GoogleMap
          center={center}
          mapContainerStyle={mapContainerStyle}
          options={googleMapOptions}
          zoom={12}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    );
  }

  return (
    <iframe
      className={s.embed}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={buildOsmEmbedUrl()}
      title="Map preview"
    />
  );
};

const Maps = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
  const [googleFailed, setGoogleFailed] = useState(false);
  const useGoogleProvider = Boolean(apiKey) && !googleFailed;

  const providerMeta = useMemo(
    () =>
      useGoogleProvider
        ? {
            color: 'success',
            description: 'Google Maps is active. The page is using the configured API key.',
            label: 'Google live',
            provider: 'Google Maps',
          }
        : {
            color: 'warning',
            description:
              'The page falls back to embedded OpenStreetMap, so the demo still works without secrets.',
            label: 'Keyless fallback',
            provider: 'OpenStreetMap',
          },
    [useGoogleProvider]
  );

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Maps</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="page-title mb-lg">
        Maps - <span className="fw-semi-bold">Live Preview</span>
      </h1>
      <Row className="g-4">
        <Col lg={8}>
          <Widget
            className={s.mapWidget}
            title={(
              <div className={s.mapHeader}>
                <div>
                  <h5 className="mt-0 mb-1 d-flex align-items-center gap-2">
                    <GeoAlt aria-hidden="true" className={s.headerIcon} />
                    Melbourne Point
                  </h5>
                  <p className={s.mapSubtitle}>Interactive map preview with a zero-config fallback.</p>
                </div>
                <Badge color={providerMeta.color} pill>
                  {providerMeta.label}
                </Badge>
              </div>
            )}
          >
            <div className={s.mapViewport}>
              <MapCanvas
                apiKey={apiKey}
                onGoogleError={() => setGoogleFailed(true)}
                useGoogleProvider={useGoogleProvider}
              />
              <div className={s.mapOverlay}>
                <span className={s.overlayLabel}>Pinned location</span>
                <strong>Flatlogic sample marker</strong>
                <span className={s.overlayMeta}>Melbourne, Australia</span>
              </div>
            </div>
          </Widget>
        </Col>
        <Col lg={4}>
          <Widget title={<h5 className="mt-0 mb-0">Map status</h5>}>
            <div className={s.metaCard}>
              <div className={s.metaBadges}>
                <Badge color={providerMeta.color} pill>
                  {providerMeta.provider}
                </Badge>
                <Badge color="default" pill>
                  Demo ready
                </Badge>
              </div>
              <p className={s.metaLead}>{providerMeta.description}</p>
              <dl className={s.metaList}>
                <dt>
                  <PinMap aria-hidden="true" className={s.metaIcon} />
                  Center
                </dt>
                <dd>{`${formatCoordinate(center.lat)}, ${formatCoordinate(center.lng)}`}</dd>
                <dt>
                  <Layers aria-hidden="true" className={s.metaIcon} />
                  Source
                </dt>
                <dd>{providerMeta.provider}</dd>
                <dt>
                  <GeoAlt aria-hidden="true" className={s.metaIcon} />
                  Optional key
                </dt>
                <dd>{apiKey ? 'Configured' : 'Not set'}</dd>
              </dl>
              <a
                className={`btn btn-default ${s.externalLink}`}
                href={osmLocationUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open full map
              </a>
              {!apiKey ? (
                <p className={s.metaHint}>
                  Add <code>VITE_GOOGLE_MAPS_API_KEY</code> only if you specifically need the
                  Google renderer.
                </p>
              ) : null}
            </div>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Maps;
