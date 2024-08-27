using MediatR;
using System.Text;

namespace Domain
{
    public record ConvertInputStringCommand : IRequest<string>
    {
        public string InputString { get; set; }
    }

    public class ConvertInputStringCommandHandler : IRequestHandler<ConvertInputStringCommand, string>
    {
        public async Task<string> Handle(ConvertInputStringCommand request, CancellationToken cancellationToken)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(request.InputString);
            string base64String = Convert.ToBase64String(bytes);

            return base64String;
        }
    }
}
