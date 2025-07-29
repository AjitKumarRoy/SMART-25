import { Section } from '@/components/ui/Section';
import pageData from '@/data/registrationPage/registrationPage.json';

export const CancellationPolicySection = () => {
    return (
        <Section>
            <div className="mx-auto max-w-4xl rounded-lg bg-slate-100 p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800">Cancellation Policy</h3>
                <p className="mt-4 text-gray-600">{pageData.cancellationPolicy}</p>
            </div>
        </Section>
    );
};