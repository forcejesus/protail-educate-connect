
interface AttestationPreviewFooterProps {
  date: string;
}

const AttestationPreviewFooter = ({ date }: AttestationPreviewFooterProps) => {
  return (
    <div className="flex justify-between items-end mt-8">
      <div>
        <p className="text-sm">
          Fait à Brazzaville, le {new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <div className="mt-2">
          <p className="text-sm">Le Directeur Général</p>
          <div className="h-12 w-28 mt-6 mb-1">
            <p>Signature et tampon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttestationPreviewFooter;
