import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { CreateEvent } from '../apiCalls/events'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AlertCircle, ImagePlus, X, CheckCircle2, ArrowLeft, CalendarIcon, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const EVENT_TYPES = [
    { value: 'seminar',  label: 'Seminar'  },
    { value: 'workshop', label: 'Workshop' },
    { value: 'webinar',  label: 'Webinar'  },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'social',   label: 'Social'   },
]

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const MINUTES = ['00', '15', '30', '45']

const ProposeEvent = () => {
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [calendarOpen, setCalendarOpen] = useState(false)

    const [form, setForm] = useState({
        name: '',
        description: '',
        date: null,      // Date object from calendar
        hour: '09',
        minute: '00',
        location: '',
        event_type: '',
        capacity: '',
    })

    const [errors, setErrors] = useState({})

    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setImageFile(file)
        const reader = new FileReader()
        reader.onloadend = () => setImagePreview(reader.result)
        reader.readAsDataURL(file)
    }

    const validate = () => {
        const errs = {}
        if (!form.name.trim())        errs.name        = 'Event name is required.'
        if (!form.description.trim()) errs.description = 'Description is required.'
        if (!form.date)               errs.date        = 'Date is required.'
        if (!form.location.trim())    errs.location    = 'Location is required.'
        if (!form.event_type)         errs.event_type  = 'Please select an event type.'
        if (!form.capacity || parseInt(form.capacity) < 1) errs.capacity = 'Capacity must be at least 1.'
        if (form.date) {
            const dt = new Date(form.date)
            dt.setHours(parseInt(form.hour), parseInt(form.minute))
            if (dt < new Date()) errs.date = 'Event cannot be scheduled in the past.'
        }
        return errs
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        const dateStr = format(form.date, 'yyyy-MM-dd')
        const timeStr = `${form.hour}:${form.minute}`

        const formData = new FormData()
        formData.append('name', form.name.trim())
        formData.append('description', form.description.trim())
        formData.append('date', dateStr)
        formData.append('time', timeStr)
        formData.append('location', form.location.trim())
        formData.append('event_type', form.event_type)
        formData.append('capacity', form.capacity)
        if (imageFile) formData.append('image', imageFile)

        setSubmitting(true)
        try {
            await CreateEvent(formData)
            setSubmitted(true)
        } catch {
            // error already shown via Swal inside CreateEvent
        } finally {
            setSubmitting(false)
        }
    }

    const resetForm = () => {
        setForm({ name: '', description: '', date: null, hour: '09', minute: '00', location: '', event_type: '', capacity: '' })
        setImageFile(null)
        setImagePreview(null)
        setErrors({})
        setSubmitted(false)
    }

    // ── Success screen ────────────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h2 className="text-xl font-GeneralSans-Semibold text-gray-800 mb-2">Event Submitted!</h2>
                    <p className="text-sm text-gray-500 font-GeneralSans leading-relaxed mb-6">
                        Your event has been submitted for admin review. You will receive an email once a decision is made.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate('/upcoming-events')}
                            className="bg-[#522374] text-white font-GeneralSans-Medium text-sm px-5 py-2.5 rounded-xl hover:bg-[#3d1a57] transition-colors"
                        >
                            Back to Events
                        </button>
                        <button
                            onClick={resetForm}
                            className="border border-gray-200 text-gray-600 font-GeneralSans-Medium text-sm px-5 py-2.5 rounded-xl hover:border-gray-400 transition-colors"
                        >
                            Propose Another
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // ── Form ─────────────────────────────────────────────────────────────────
    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
            <button
                onClick={() => navigate('/upcoming-events')}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
            >
                <ArrowLeft size={15} />
                Back to Events
            </button>

            <div className="mb-6">
                <h1 className="text-2xl font-GeneralSans-Semibold text-[#522374]">Propose an Event</h1>
                <p className="text-sm text-gray-500 font-GeneralSans mt-1">
                    Fill in the details below. Your event will be reviewed by an admin before it appears on the platform.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex flex-col gap-5">

                    {/* Name */}
                    <Field label="Event Name" required error={errors.name}>
                        <input
                            type="text"
                            placeholder="e.g. Introduction to Clinical Research"
                            maxLength={200}
                            className={inputCls(errors.name)}
                            value={form.name}
                            onChange={set('name')}
                        />
                    </Field>

                    {/* Description */}
                    <Field label="Description" required error={errors.description}>
                        <textarea
                            rows={4}
                            placeholder="What is this event about? Who should attend?"
                            maxLength={2000}
                            className={cn(inputCls(errors.description), 'resize-none leading-relaxed')}
                            value={form.description}
                            onChange={set('description')}
                        />
                        <p className="text-right text-[10px] text-gray-400 font-GeneralSans mt-1">
                            {2000 - form.description.length} left
                        </p>
                    </Field>

                    {/* Date + Time row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Date — shadcn Calendar in Popover */}
                        <Field label="Date" required error={errors.date}>
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <button
                                        type="button"
                                        className={cn(
                                            'w-full flex items-center gap-2 text-left border rounded-xl px-4 py-3 text-sm font-GeneralSans transition-colors',
                                            form.date ? 'text-gray-800' : 'text-gray-400',
                                            errors.date
                                                ? 'border-red-300 focus:border-red-400'
                                                : 'border-gray-200 hover:border-[#522374] focus:border-[#522374]',
                                            'focus:outline-none bg-white'
                                        )}
                                    >
                                        <CalendarIcon size={15} className="text-gray-400 shrink-0" />
                                        {form.date ? format(form.date, 'PPP') : 'Pick a date'}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={form.date}
                                        onSelect={(date) => {
                                            setForm(f => ({ ...f, date }))
                                            setCalendarOpen(false)
                                        }}
                                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </Field>

                        {/* Time — hour + minute selects */}
                        <Field label="Time" required error={errors.time}>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus-within:border-[#522374] transition-colors">
                                    <Clock size={14} className="text-gray-400 shrink-0" />
                                    <select
                                        className="flex-1 text-sm font-GeneralSans text-gray-700 bg-transparent focus:outline-none cursor-pointer appearance-none"
                                        value={form.hour}
                                        onChange={set('hour')}
                                    >
                                        {HOURS.map(h => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                    <span className="text-gray-400 text-sm font-GeneralSans">:</span>
                                    <select
                                        className="flex-1 text-sm font-GeneralSans text-gray-700 bg-transparent focus:outline-none cursor-pointer appearance-none"
                                        value={form.minute}
                                        onChange={set('minute')}
                                    >
                                        {MINUTES.map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </Field>
                    </div>

                    {/* Location */}
                    <Field label="Location" required error={errors.location}>
                        <input
                            type="text"
                            placeholder="e.g. Lecture Hall B, Main Campus or Online (Zoom)"
                            maxLength={200}
                            className={inputCls(errors.location)}
                            value={form.location}
                            onChange={set('location')}
                        />
                    </Field>

                    {/* Type + Capacity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Event Type" required error={errors.event_type}>
                            <select
                                className={cn(inputCls(errors.event_type), 'cursor-pointer')}
                                value={form.event_type}
                                onChange={set('event_type')}
                            >
                                <option value="">Select type…</option>
                                {EVENT_TYPES.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Capacity" required error={errors.capacity}>
                            <input
                                type="number"
                                min={1}
                                max={10000}
                                placeholder="Max attendees"
                                className={inputCls(errors.capacity)}
                                value={form.capacity}
                                onChange={set('capacity')}
                            />
                        </Field>
                    </div>

                    {/* Banner image */}
                    <Field label="Event Banner" error={null}>
                        <p className="text-xs text-gray-400 font-GeneralSans mb-2">
                            Optional. Recommended size 1200×630px.
                        </p>
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="w-full h-40 object-cover rounded-xl border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => { setImageFile(null); setImagePreview(null) }}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm border border-gray-200 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="event-image"
                                className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 hover:border-[#522374] rounded-xl px-4 py-8 cursor-pointer transition-colors group"
                            >
                                <ImagePlus size={22} className="text-gray-300 group-hover:text-[#522374] transition-colors" />
                                <span className="text-sm text-gray-400 font-GeneralSans group-hover:text-[#522374] transition-colors">
                                    Click to upload banner image
                                </span>
                                <span className="text-xs text-gray-300 font-GeneralSans">PNG, JPG up to 5MB</span>
                                <input
                                    type="file"
                                    id="event-image"
                                    className="hidden"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </Field>

                    {/* Admin review notice */}
                    <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 font-GeneralSans">
                        <AlertCircle size={14} className="shrink-0 mt-0.5" />
                        <p>
                            Your event will not be visible to others until an admin approves it.
                            You will receive an email notification once reviewed.
                        </p>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-1">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-[#522374] text-white font-GeneralSans-Semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#3d1a57] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {submitting ? 'Submitting…' : 'Submit for Review'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

function Field({ label, required, error, children }) {
    return (
        <div>
            <label className="block text-sm font-GeneralSans-Semibold text-gray-700 mb-1.5">
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            {children}
            {error && (
                <p className="mt-1 text-xs text-red-500 font-GeneralSans flex items-center gap-1">
                    <AlertCircle size={11} className="shrink-0" />
                    {error}
                </p>
            )}
        </div>
    )
}

function inputCls(hasError) {
    return cn(
        'w-full bg-white border rounded-xl px-4 py-3 text-sm font-GeneralSans placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all',
        hasError
            ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
            : 'border-gray-200 focus:ring-[#522374]/10 focus:border-[#522374]'
    )
}

export default ProposeEvent
