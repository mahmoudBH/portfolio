import { motion } from 'framer-motion';
import { Radio, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

type ContactFormProps = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

const ContactForm = ({ onSuccess, onError }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Formspree endpoint
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgvapoy";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Message from ${formData.name} - Portfolio Contact`,
          _format: "plain"
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Transmission successful! Signal received and decoded.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });

        // Call success callback
        if (onSuccess) onSuccess();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Transmission failed. Please check your connection.');
      }
    } catch (error) {
      setSubmitStatus('error');
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Signal interrupted. Please try again.';
      setSubmitMessage(errorMessage);
      
      // Call error callback
      if (onError) onError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form status after timeout
  const resetStatus = () => {
    setTimeout(() => {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }, 5000);
  };

  if (submitStatus === 'success') {
    resetStatus();
  }

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
      
      <div className="glass-panel rounded-2xl p-8 border border-neutral-800 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
          <h3 className="text-2xl font-bold text-white font-mono tracking-wider">
            TRANSMISSION_FORM
          </h3>
        </div>
        
        {/* Formspree Form */}
        <form 
          method="POST" 
          action={FORMSPREE_ENDPOINT}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Hidden fields for Formspree */}
          <input type="hidden" name="_subject" value={`New Message from ${formData.name} - Portfolio Contact`} />
          <input type="hidden" name="_format" value="plain" />
          <input type="hidden" name="_language" value="en" />
          
          <FormField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="IDENTIFICATION"
            placeholder="Enter your name"
            fieldType="name"
            required
          />

          <FormField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="COMMUNICATION_FREQUENCY"
            placeholder="your.signal@frequency.com"
            fieldType="email"
            required
          />

          <MessageField
            name="message"
            value={formData.message}
            onChange={handleChange}
            label="MESSAGE_TRANSMISSION"
            placeholder="Prepare your transmission..."
            required
          />

          {/* Submission Status Messages */}
          {submitStatus === 'success' && (
            <SuccessMessage message={submitMessage} />
          )}

          {submitStatus === 'error' && (
            <ErrorMessage message={submitMessage} />
          )}

          <SubmitButton 
            isSubmitting={isSubmitting} 
            submitStatus={submitStatus}
          />
        </form>
      </div>
    </div>
  );
};

// Form Field Component
interface FormFieldProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  fieldType?: string;
  required?: boolean;
}

const FormField = ({ 
  type, name, value, onChange, label, placeholder, fieldType, required = false 
}: FormFieldProps) => {
  const isEmail = fieldType === 'email';
  
  return (
    <div className="group">
      <label 
        htmlFor={name}
        className="block text-sm font-medium mb-3 text-neutral-400 font-mono"
      >
        <span className="text-cyan-400">//</span> {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-5 py-4 rounded-xl glass-panel border border-neutral-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 font-mono text-neutral-200 placeholder-neutral-600"
        placeholder={placeholder}
        required={required}
        aria-label={placeholder}
        aria-required={required}
      />
    </div>
  );
};

// Message Field Component
interface MessageFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder: string;
  required?: boolean;
}

const MessageField = ({ 
  name, value, onChange, label, placeholder, required = false 
}: MessageFieldProps) => {
  return (
    <div className="group">
      <label 
        htmlFor={name}
        className="block text-sm font-medium mb-3 text-neutral-400 font-mono"
      >
        <span className="text-cyan-400">//</span> {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={6}
        className="w-full px-5 py-4 rounded-xl glass-panel border border-neutral-800 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 font-mono text-neutral-200 placeholder-neutral-600 resize-none"
        placeholder={placeholder}
        required={required}
        aria-label={placeholder}
        aria-required={required}
      ></textarea>
    </div>
  );
};

// Success Message Component
interface SuccessMessageProps {
  message: string;
}

const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="text-emerald-400" size={20} />
        <div>
          <div className="font-medium text-emerald-300 font-mono text-sm">TRANSMISSION_SUCCESSFUL</div>
          <div className="text-sm text-emerald-400/80 mt-1">{message}</div>
        </div>
      </div>
      <div className="mt-2 flex gap-1">
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Error Message Component
interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-red-500/10 border border-red-500/30"
    >
      <div className="flex items-center gap-3">
        <AlertCircle className="text-red-400" size={20} />
        <div>
          <div className="font-medium text-red-300 font-mono text-sm">TRANSMISSION_FAILED</div>
          <div className="text-sm text-red-400/80 mt-1">{message}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Submit Button Component
interface SubmitButtonProps {
  isSubmitting: boolean;
  submitStatus?: 'idle' | 'success' | 'error';
}

const SubmitButton = ({ isSubmitting, submitStatus = 'idle' }: SubmitButtonProps) => {
  const getButtonText = () => {
    if (isSubmitting) return 'TRANSMITTING...';
    if (submitStatus === 'success') return 'TRANSMISSION_COMPLETE';
    if (submitStatus === 'error') return 'RETRY_TRANSMISSION';
    return 'INITIATE_TRANSMISSION';
  };

  const getButtonStyle = () => {
    if (submitStatus === 'success') {
      return 'from-emerald-500/20 via-emerald-500/10 to-emerald-500/20 border-emerald-500/30 hover:border-emerald-500/60';
    }
    if (submitStatus === 'error') {
      return 'from-red-500/20 via-red-500/10 to-red-500/20 border-red-500/30 hover:border-red-500/60';
    }
    return 'from-cyan-500/20 via-cyan-500/10 to-purple-500/20 border-cyan-500/30 hover:border-cyan-500/60';
  };

  return (
    <motion.button
      type="submit"
      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      disabled={isSubmitting}
      className={`w-full py-4 rounded-xl bg-gradient-to-r ${getButtonStyle()} font-semibold flex items-center justify-center gap-3 transition-all duration-300 group relative overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${
        submitStatus === 'success' 
          ? 'from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-emerald-500/20 group-hover:to-emerald-500/10' 
          : submitStatus === 'error'
          ? 'from-red-500/0 via-red-500/5 to-red-500/0 group-hover:from-red-500/10 group-hover:via-red-500/20 group-hover:to-red-500/10'
          : 'from-cyan-500/0 via-cyan-500/5 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-500/20 group-hover:to-purple-500/10'
      } transition-all duration-300`}></div>
      
      {isSubmitting ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Radio size={20} className="text-cyan-400" />
          </motion.div>
          <span className="text-cyan-300 font-mono relative z-10">
            {getButtonText()}
          </span>
        </>
      ) : (
        <>
          {submitStatus === 'success' ? (
            <CheckCircle size={20} className="text-emerald-400" />
          ) : submitStatus === 'error' ? (
            <AlertCircle size={20} className="text-red-400" />
          ) : (
            <Send size={20} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
          )}
          <span className={`font-mono relative z-10 ${
            submitStatus === 'success' ? 'text-emerald-300' :
            submitStatus === 'error' ? 'text-red-300' :
            'text-cyan-300'
          }`}>
            {getButtonText()}
          </span>
        </>
      )}
    </motion.button>
  );
};

export default ContactForm;