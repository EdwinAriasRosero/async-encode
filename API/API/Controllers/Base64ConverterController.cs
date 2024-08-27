using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Base64ConverterController : ControllerBase
    {
        private readonly ILogger<Base64ConverterController> _logger;
        private readonly IMediator _mediator;

        public Base64ConverterController(ILogger<Base64ConverterController> logger,
            IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet]
        public async IAsyncEnumerable<char> Get(string input)
        {
            var random = new Random();
            var command = new ConvertInputStringCommand { InputString = input };
            char[] response = (await _mediator.Send(command)).ToCharArray();

            for (int i = 0; i < response.Length; i++)
            {
                int delay = random.Next(1000, 5000);
                await Task.Delay(delay);
                yield return response[i];
            }
        }

    }
}