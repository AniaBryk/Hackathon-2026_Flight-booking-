import { useState } from 'react'
import { flights } from './data/flights'
import './App.css'

const airports = {
  BLR: 'Bengaluru (BLR)',
  DEL: 'New Delhi (DEL)',
  BOM: 'Mumbai (BOM)',
}

const money = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', currencyDisplay: 'code', maximumFractionDigits: 0,
})

function displayDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function App() {
  const [search, setSearch] = useState({ origin: 'BLR', destination: 'DEL', date: '2026-11-20' })
  const [results, setResults] = useState(null)
  const [searchError, setSearchError] = useState('')
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [testName, setTestName] = useState('Test Traveller')
  const [passengerCount, setPassengerCount] = useState('1')
  const [bookingError, setBookingError] = useState('')
  const [confirmation, setConfirmation] = useState(null)

  const count = Number(passengerCount)
  const validCount = Number.isInteger(count) && count >= 1 && count <= 6
  const total = selectedFlight && validCount ? selectedFlight.priceInr * count : null

  function clearBooking() {
    setSelectedFlight(null)
    setConfirmation(null)
    setBookingError('')
  }

  function updateSearch(event) {
    setSearch({ ...search, [event.target.name]: event.target.value })
    setResults(null)
    setSearchError('')
    clearBooking()
  }

  function findFlights(event) {
    event.preventDefault()
    setResults(null)
    clearBooking()
    if (search.origin === search.destination) {
      setSearchError('Choose different departure and arrival airports.')
      return
    }
    if (!search.date) {
      setSearchError('Choose a travel date before searching.')
      return
    }
    setSearchError('')
    setResults(flights.filter((flight) => (
      flight.origin === search.origin && flight.destination === search.destination && flight.date === search.date
    )))
  }

  function selectFlight(flight) {
    setSelectedFlight(flight)
    setConfirmation(null)
    setBookingError('')
  }

  function confirmBooking(event) {
    event.preventDefault()
    setConfirmation(null)
    if (!selectedFlight) {
      setBookingError('Select a flight before confirming.')
      return
    }
    if (!testName.trim()) {
      setBookingError('Enter a test name, such as Test Traveller. Use fictional details only.')
      return
    }
    if (!validCount) {
      setBookingError('Passenger count must be a whole number from 1 to 6.')
      return
    }
    setBookingError('')
    setConfirmation({
      reference: `TRAIN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      status: 'SIMULATED',
      flight: selectedFlight,
      name: testName.trim(),
      passengerCount: count,
      total,
    })
  }

  return (
    <>
      <div className="training-banner">TRAINING ONLY — simulated booking, no ticket issued</div>
      <div className="app-shell">
        <header className="page-header">
          <a className="brand" href="./" aria-label="Training Flights home">
            <span className="brand-mark" aria-hidden="true">↗</span>
            Training Flights
          </a>
          <span className="demo-label">BROWSER DEMO</span>
        </header>

        <main>
          <section className="intro" aria-labelledby="page-title">
            <p className="eyebrow">A LITTLE PRACTICE. A NEW DESTINATION.</p>
            <h1 id="page-title">Your next flight,<br /><span>just for practice.</span></h1>
            <p>Explore sample flights and try a simulated booking. All fares and journeys are fictional.</p>
          </section>

          <section className="panel search-panel" aria-labelledby="search-title">
            <div className="section-heading">
              <span className="step-number" aria-hidden="true">01</span>
              <h2 id="search-title">Find a flight</h2>
            </div>
            <form className="search-form" onSubmit={findFlights} noValidate>
              <label htmlFor="origin">From
                <select id="origin" name="origin" value={search.origin} onChange={updateSearch}>
                  {Object.entries(airports).map(([code, label]) => <option key={code} value={code}>{label}</option>)}
                </select>
              </label>
              <label htmlFor="destination">To
                <select id="destination" name="destination" value={search.destination} onChange={updateSearch}>
                  {Object.entries(airports).map(([code, label]) => <option key={code} value={code}>{label}</option>)}
                </select>
              </label>
              <label htmlFor="date">Travel date
                <input id="date" name="date" type="date" required value={search.date} onChange={updateSearch} />
              </label>
              <button className="primary-button" type="submit">Search flights <span aria-hidden="true">→</span></button>
            </form>
            {searchError && <p className="error" role="alert">{searchError}</p>}
            <p className="hint">Try Bengaluru → New Delhi on 20 Nov 2026. All departures are local IST times.</p>
          </section>

          <div className="journey-grid">
            <section className="results-section" aria-labelledby="results-title">
              <div className="section-heading">
                <span className="step-number" aria-hidden="true">02</span>
                <h2 id="results-title">Choose your flight</h2>
              </div>
              <p className="results-summary" role="status">
                {results === null ? 'Search to see the available sample flights.' : `${results.length} sample ${results.length === 1 ? 'flight' : 'flights'} found`}
              </p>
              {results?.length === 0 && <div className="empty-state">
                <h3>No flights found</h3>
                <p>There are no sample flights for this route and date. Try BLR → DEL or BLR → BOM on 20 Nov 2026.</p>
              </div>}
              <ul className="flight-list">
                {results?.map((flight) => <li className={`flight-card${selectedFlight?.id === flight.id ? ' is-selected' : ''}`} key={flight.id}>
                  <div className="flight-topline"><strong>{flight.airline}</strong><span>{flight.id}</span></div>
                  <div className="flight-route"><strong>{flight.origin}</strong><span aria-hidden="true">→</span><strong>{flight.destination}</strong></div>
                  <p>{airports[flight.origin]} to {airports[flight.destination]}</p>
                  <p>{displayDate(flight.date)} · {flight.departure} IST</p>
                  <div className="flight-bottomline">
                    <strong>{money.format(flight.priceInr)} <small>/ person</small></strong>
                    <button type="button" className="select-button" aria-pressed={selectedFlight?.id === flight.id}
                      aria-label={`Select flight ${flight.id}`} onClick={() => selectFlight(flight)}>
                      {selectedFlight?.id === flight.id ? 'Selected' : 'Select flight'}
                    </button>
                  </div>
                </li>)}
              </ul>
            </section>
            <aside className="panel booking-panel" aria-labelledby="booking-title">
              <div className="section-heading"><span className="step-number" aria-hidden="true">03</span><h2 id="booking-title">Your practice booking</h2></div>
              {!selectedFlight ? <p className="booking-placeholder">Choose a sample flight to enter test details and see your total.</p> : <>
                <div className="booking-summary">
                  <strong>{selectedFlight.origin} → {selectedFlight.destination}</strong>
                  <p>{selectedFlight.airline} · {selectedFlight.id}</p>
                  <p>{airports[selectedFlight.origin]} to {airports[selectedFlight.destination]}</p>
                  <p>{displayDate(selectedFlight.date)} · {selectedFlight.departure} IST</p>
                  <p>{money.format(selectedFlight.priceInr)} per person</p>
                </div>
                <form className="booking-form" onSubmit={confirmBooking} noValidate>
                  <label htmlFor="test-name">Test name
                    <input id="test-name" name="testName" type="text" required autoComplete="off"
                      aria-describedby="test-name-hint" value={testName} onChange={(event) => {
                        setTestName(event.target.value)
                        setConfirmation(null)
                        setBookingError('')
                      }} />
                  </label>
                  <p className="hint" id="test-name-hint">Use Test Traveller or another fictional name. Do not enter real passenger information.</p>
                  <label htmlFor="passengers">Passengers
                    <input id="passengers" name="passengers" type="number" min="1" max="6" step="1" required
                      aria-describedby="passengers-hint" value={passengerCount} onChange={(event) => {
                        setPassengerCount(event.target.value)
                        setConfirmation(null)
                        setBookingError('')
                      }} />
                  </label>
                  <p className="hint" id="passengers-hint">Enter a whole number from 1 to 6.</p>
                  <div className="total-row" aria-live="polite"><span>Total (INR)</span><strong>{total === null ? '—' : money.format(total)}</strong></div>
                  {bookingError && <p className="error" role="alert">{bookingError}</p>}
                  <button type="submit" className="primary-button">Confirm simulated booking</button>
                </form>
              </>}
              <div aria-live="polite" aria-atomic="true">
                {confirmation && <section className="confirmation" aria-labelledby="confirmation-title">
                  <h3 id="confirmation-title">Practice booking confirmed</h3>
                  <p>This is a simulation. No real reservation exists and no ticket has been issued.</p>
                  <dl>
                    <dt>Status</dt><dd>{confirmation.status}</dd>
                    <dt>Reference</dt><dd>{confirmation.reference}</dd>
                    <dt>Flight</dt><dd>{confirmation.flight.id}</dd>
                    <dt>Route</dt><dd>{confirmation.flight.origin} → {confirmation.flight.destination}</dd>
                    <dt>Date</dt><dd>{displayDate(confirmation.flight.date)}</dd>
                    <dt>Departure</dt><dd>{confirmation.flight.departure} IST</dd>
                    <dt>Test name</dt><dd>{confirmation.name}</dd>
                    <dt>Passengers</dt><dd>{confirmation.passengerCount}</dd>
                    <dt>Total (INR)</dt><dd>{money.format(confirmation.total)}</dd>
                  </dl>
                </section>}
              </div>
            </aside>
          </div>
        </main>
        <footer>Made for learning. Fictional flights, fictional fares, no real reservation.</footer>
      </div>
    </>
  )
}

export default App
